import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    university_name: '',
    department: '',
    name: '',
    roll_no: '',
    email: '',
    phone: '',
    branch: '',
    year: '',
    date: '',
    time: '',
    location: '',
    reg_fee: '',
    amount_paid: '',
    payment_method: '',
    transaction_id: '',
    bank_name: '',
    utr_no: '',
    cheque_no: '',
    issuing_bank: '',
    prior_exp: '',
    software_used: '',
    expectations: '',
    decl_accuracy: false,
    decl_rules: false,
    decl_media: false
  })

  const [paymentMethod, setPaymentMethod] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value)
    handleChange(e)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.decl_accuracy || !formData.decl_rules) {
      alert('Please accept both mandatory declaration checkboxes before submitting.')
      return
    }
    setIsSubmitting(true)

    const formDataToSend = new FormData()
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key])
    })

    try {
      const res = await fetch('https://formspree.io/f/xdawnzdp', {
        method: 'POST',
        body: formDataToSend,
        headers: { 'Accept': 'application/json' }
      })
      if (res.ok) {
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        alert('Submission failed. Please try again.')
        setIsSubmitting(false)
      }
    } catch (err) {
      alert('Network error. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="corner tl"></div>
        <div className="corner tr"></div>
        <div className="corner bl"></div>
        <div className="corner br"></div>
        <div className="brand-label">The Correct Steps</div>
        <h1 className="page-title">CAD &amp; <span>CAE</span> Workshop<br />Registration Form</h1>
        <p className="page-subtitle">University Students Edition &mdash; Engineering Excellence Program</p>
      </div>

      <form id="workshopForm" onSubmit={handleSubmit}>
        <div className="form-card">
          <div className="section-header">
            <div className="section-marker"></div>
            <span className="section-title">University Details</span>
            <span className="section-num">01 / 07</span>
          </div>
          <div className="section-body">
            <div className="field-grid">
              <div className="field-group">
                <label>University Name <span className="req">*</span></label>
                <input type="text" name="university_name" placeholder="Enter university name" value={formData.university_name} onChange={handleChange} required />
              </div>
              <div className="field-group">
                <label>College / Department <span className="req">*</span></label>
                <input type="text" name="department" placeholder="e.g. Dept. of Mechanical Engineering" value={formData.department} onChange={handleChange} required />
              </div>
            </div>
          </div>
        </div>

        <div className="spacer"></div>

        <div className="form-card">
          <div className="section-header">
            <div className="section-marker"></div>
            <span className="section-title">Student Details</span>
            <span className="section-num">02 / 07</span>
          </div>
          <div className="section-body">
            <div className="field-grid">
              <div className="field-group">
                <label>Full Name <span className="req">*</span></label>
                <input type="text" name="name" placeholder="As per university records" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="field-group">
                <label>Roll No. <span className="req">*</span></label>
                <input type="text" name="roll_no" placeholder="e.g. 21ME1043" value={formData.roll_no} onChange={handleChange} required />
              </div>
              <div className="field-group">
                <label>Email Address <span className="req">*</span></label>
                <input type="email" name="email" placeholder="your@university.edu" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="field-group">
                <label>Phone Number <span className="req">*</span></label>
                <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="field-group">
                <label>Branch / Specialization <span className="req">*</span></label>
                <input type="text" name="branch" placeholder="e.g. Aerospace Engineering" value={formData.branch} onChange={handleChange} required />
              </div>
              <div className="field-group">
                <label>Year of Study <span className="req">*</span></label>
                <div className="radio-group">
                  <label className="radio-option"><input type="radio" name="year" value="1st Year" onChange={handleChange} required /><span>1st Year</span></label>
                  <label className="radio-option"><input type="radio" name="year" value="2nd Year" onChange={handleChange} /><span>2nd Year</span></label>
                  <label className="radio-option"><input type="radio" name="year" value="3rd Year" onChange={handleChange} /><span>3rd Year</span></label>
                  <label className="radio-option"><input type="radio" name="year" value="4th Year" onChange={handleChange} /><span>4th Year</span></label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="spacer"></div>

        <div className="form-card">
          <div className="section-header">
            <div className="section-marker"></div>
            <span className="section-title">Workshop Details</span>
            <span className="section-num">03 / 07</span>
          </div>
          <div className="section-body">
            <div className="info-banner">
              <strong>Workshop Name:</strong> CAD and CAE Workshop for University Students
            </div>
            <div className="workshop-info-grid">
              <div className="workshop-info-cell">
                <div className="cell-label">Date</div>
                <input type="text" name="date" placeholder="DD / MM / YYYY" value={formData.date} onChange={handleChange} />
              </div>
              <div className="workshop-info-cell">
                <div className="cell-label">Time</div>
                <input type="text" name="time" placeholder="e.g. 09:00 AM" value={formData.time} onChange={handleChange} />
              </div>
              <div className="workshop-info-cell">
                <div className="cell-label">Location / Venue</div>
                <input type="text" name="location" placeholder="Hall / Lab name" value={formData.location} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="spacer"></div>

        <div className="form-card">
          <div className="section-header">
            <div className="section-marker"></div>
            <span className="section-title">Registration &amp; Payment</span>
            <span className="section-num">04 / 07</span>
          </div>
          <div className="section-body">
            <div className="field-grid">
              <div className="field-group">
                <label>Registration Fee</label>
                <input type="text" name="reg_fee" placeholder="&#8377; Amount" value={formData.reg_fee} onChange={handleChange} />
              </div>
              <div className="field-group">
                <label>Amount Paid <span className="req">*</span></label>
                <input type="text" name="amount_paid" placeholder="&#8377; ____" value={formData.amount_paid} onChange={handleChange} required />
              </div>
              <div className="field-group field-span-2">
                <label>Payment Method <span className="req">*</span></label>
                <div className="radio-group">
                  <label className="radio-option"><input type="radio" name="payment_method" value="Online Payment" onChange={handlePaymentChange} required /><span>Online Payment</span></label>
                  <label className="radio-option"><input type="radio" name="payment_method" value="Bank Transfer" onChange={handlePaymentChange} /><span>Bank Transfer</span></label>
                  <label className="radio-option"><input type="radio" name="payment_method" value="Cheque/DD" onChange={handlePaymentChange} /><span>Cheque / DD</span></label>
                </div>
              </div>
            </div>
            <div className={`payment-conditional ${paymentMethod === 'Online Payment' ? 'active' : ''}`}>
              <div className="field-group">
                <label>Transaction ID <span className="req">*</span></label>
                <input type="text" name="transaction_id" placeholder="e.g. TXN20240101XXXX" value={formData.transaction_id} onChange={handleChange} />
              </div>
            </div>
            <div className={`payment-conditional ${paymentMethod === 'Bank Transfer' ? 'active' : ''}`}>
              <div className="field-group">
                <label>Bank Name <span className="req">*</span></label>
                <input type="text" name="bank_name" placeholder="e.g. State Bank of India" value={formData.bank_name} onChange={handleChange} />
              </div>
              <div className="field-group">
                <label>UTR / Reference No.</label>
                <input type="text" name="utr_no" placeholder="Transfer reference number" value={formData.utr_no} onChange={handleChange} />
              </div>
            </div>
            <div className={`payment-conditional ${paymentMethod === 'Cheque/DD' ? 'active' : ''}`}>
              <div className="field-group">
                <label>Cheque / DD No. <span className="req">*</span></label>
                <input type="text" name="cheque_no" placeholder="Instrument number" value={formData.cheque_no} onChange={handleChange} />
              </div>
              <div className="field-group">
                <label>Issuing Bank</label>
                <input type="text" name="issuing_bank" placeholder="Bank name on instrument" value={formData.issuing_bank} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="spacer"></div>

        <div className="form-card">
          <div className="section-header">
            <div className="section-marker"></div>
            <span className="section-title">Additional Information</span>
            <span className="section-num">05 / 07</span>
          </div>
          <div className="section-body">
            <div className="field-grid">
              <div className="field-group">
                <label>Prior Experience with CAD / CAE? <span className="req">*</span></label>
                <div className="radio-group">
                  <label className="radio-option"><input type="radio" name="prior_exp" value="Yes" onChange={handleChange} required /><span>Yes</span></label>
                  <label className="radio-option"><input type="radio" name="prior_exp" value="No" onChange={handleChange} /><span>No</span></label>
                </div>
              </div>
              <div className="field-group">
                <label>Software Used (if any)</label>
                <input type="text" name="software_used" placeholder="e.g. ANSYS, SolidWorks, AutoCAD" value={formData.software_used} onChange={handleChange} />
              </div>
              <div className="field-group field-span-2">
                <label>What do you expect to learn? <span className="req">*</span></label>
                <textarea name="expectations" placeholder="Describe your learning goals and expectations from this workshop..." value={formData.expectations} onChange={handleChange} required></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="spacer"></div>

        <div className="form-card">
          <div className="section-header">
            <div className="section-marker"></div>
            <span className="section-title">Declaration</span>
            <span className="section-num">06 / 07</span>
          </div>
          <div className="section-body">
            <ul className="declaration-list">
              <li>
                <input type="checkbox" name="decl_accuracy" checked={formData.decl_accuracy} onChange={handleChange} required />
                <span>I hereby declare that the information provided is true and accurate to the best of my knowledge. I understand that any false information may result in disqualification.</span>
              </li>
              <li>
                <input type="checkbox" name="decl_rules" checked={formData.decl_rules} onChange={handleChange} required />
                <span>I agree to abide by the rules, regulations, and code of conduct of the workshop as communicated by the organizers.</span>
              </li>
              <li>
                <input type="checkbox" name="decl_media" checked={formData.decl_media} onChange={handleChange} />
                <span>I consent to being photographed or recorded during the workshop for documentation and promotional purposes.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="spacer"></div>

        <div className="form-card">
          <div className="section-header">
            <div className="section-marker"></div>
            <span className="section-title">Submit Registration</span>
            <span className="section-num">07 / 07</span>
          </div>
          <div className="section-body">
            {!submitted ? (
              <div id="formContent" className="submit-section">
                <p className="mandatory-note">Fields marked with <span>*</span> are mandatory</p>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
                <div className="alt-registration">
                  <div className="alt-reg-item">
                    <div className="icon">@</div>
                    <span>Email: <a href="mailto:register@thecorrectsteps.com">register@thecorrectsteps.com</a></span>
                  </div>
                  <div className="alt-reg-item">
                    <div className="icon">#</div>
                    <span>Phone: <a href="tel:+911234567890">+91 12345 67890</a></span>
                  </div>
                  <div className="alt-reg-item">
                    <div className="icon">&#8599;</div>
                    <span>Online: <a href="#">portal.thecorrectsteps.com</a></span>
                  </div>
                </div>
              </div>
            ) : (
              <div id="successMsg" className="success-msg">
                <div className="check">&#10003;</div>
                <h3>Registration Successful</h3>
                <p>Your details have been securely transmitted to the workshop team.</p>
                <p style={{ marginTop: '12px', color: 'var(--text-muted)', fontSize: '12px' }}>
                  A confirmation email will be sent to <strong>{formData.email}</strong> after verification.
                </p>
                <div style={{ marginTop: '32px' }}>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setIsSubmitting(false);
                      setFormData({
                        university_name: '', department: '', name: '', roll_no: '', email: '', phone: '',
                        branch: '', year: '', date: '', time: '', location: '', reg_fee: '',
                        amount_paid: '', payment_method: '', transaction_id: '', bank_name: '',
                        utr_no: '', cheque_no: '', issuing_bank: '', prior_exp: '',
                        software_used: '', expectations: '', decl_accuracy: false,
                        decl_rules: false, decl_media: false
                      });
                      setPaymentMethod('');
                    }}
                    className="btn-submit"
                    style={{ padding: '12px 32px', fontSize: '13px' }}
                  >
                    Register Another Student
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="notes-strip">
          <div className="notes-strip-title">Important Notes for Students</div>
          <ul>
            <li>Please bring a valid university ID card on the day of the workshop.</li>
            <li>Registration fee once paid is non-refundable under any circumstances.</li>
            <li>Seats are limited &mdash; early registration is strongly advised to confirm your spot.</li>
            <li>A confirmation email will be sent to your registered address within 48 hours of successful payment.</li>
          </ul>
        </div>
      </form>
    </div>
  )
}

export default App
