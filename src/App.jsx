import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    university_name: '', department: '', name: '', roll_no: '', email: '', phone: '',
    branch: '', year: '', date: '', time: '', location: '', reg_fee: '',
    amount: '', payment_method: '', transaction_id: '', bank_name: '',
    cheque_no: '', prior_exp: '', expectations: '', decl_accuracy: false, decl_rules: false
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

  // Extracted repetitive Tailwind class strings
  const inputBaseClass = "bg-bg-input border-2 border-transparent border-b-white/10 rounded-t text-text-primary font-exo text-[16px] p-4 w-full outline-none transition-all duration-300 placeholder-text-muted focus:border-b-brand-orange focus:bg-brand-glow";
  const labelClass = "text-[14px] font-semibold tracking-[1px] uppercase text-text-label flex gap-1";
  const formCardClass = "bg-bg-card rounded-lg overflow-hidden mb-8 border border-border-custom shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)] hover:border-brand-orange/20";
  const sectionHeaderClass = "bg-bg-section border-b border-border-custom px-5 py-4 md:px-8 md:py-5 flex items-center gap-4 border-l-4 border-l-brand-orange";
  const radioOptionClass = "flex items-center gap-2.5 cursor-pointer px-5 py-3.5 bg-bg-input border border-border-custom rounded-md transition-all duration-300 text-[15px] text-text-secondary font-semibold flex-1 justify-center relative overflow-hidden hover:border-brand-orange hover:text-text-primary has-[:checked]:border-brand-orange has-[:checked]:bg-brand-orange has-[:checked]:text-bg-deep";

  return (
    <>
      {/* Brand Header */}
      <header className="bg-bg-header border-b-2 border-brand-orange shadow-[0_4px_20px_rgba(0,0,0,0.2)] sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto py-4 md:py-5 px-4 flex justify-center items-center">
          <div className="flex items-center gap-4">
            <img 
              src="/correct.png" 
              alt="The Correct Steps Logo" 
              className="h-[50px] md:h-[70px] w-auto object-contain"
            />
            <div className="font-rajdhani text-[24px] md:text-[32px] font-bold tracking-[2px] text-text-primary">
              THE CORRECT <span className="text-brand-orange">STEPS</span>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full max-w-[850px] mx-auto mt-[60px] px-5 animate-fade-up">
        <div className="mb-12 text-center">
          <h1 className="font-rajdhani text-[32px] md:text-[42px] font-bold uppercase tracking-[1.5px] text-text-primary mb-3">
            CAD &amp; CAE Workshop <span className="text-brand-orange">Registration</span>
          </h1>
          <p className="text-[18px] text-text-secondary font-normal mb-5">
            University Students Edition
          </p>
          <div className="w-[60px] h-1 bg-brand-orange mx-auto rounded-sm"></div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 01: University Details */}
          <div className={formCardClass}>
            <div className={sectionHeaderClass}>
              <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">01</span>
              <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">University Details</span>
            </div>
            <div className="p-6 md:p-9">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-7 md:gap-x-8">
                <div className="flex flex-col gap-2.5">
                  <label className={labelClass}>University Name <span className="text-brand-orange">*</span></label>
                  <input type="text" name="university_name" className={inputBaseClass} placeholder="Enter university name" value={formData.university_name} onChange={handleChange} required />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className={labelClass}>College / Department <span className="text-brand-orange">*</span></label>
                  <input type="text" name="department" className={inputBaseClass} placeholder="e.g. Dept. of Mechanical Engineering" value={formData.department} onChange={handleChange} required />
                </div>
              </div>
            </div>
          </div>

          {/* 02: Student Details */}
          <div className={formCardClass}>
            <div className={sectionHeaderClass}>
              <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">02</span>
              <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Student Details</span>
            </div>
            <div className="p-6 md:p-9">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-7 md:gap-x-8">
                <div className="flex flex-col gap-2.5">
                  <label className={labelClass}>Name <span className="text-brand-orange">*</span></label>
                  <input type="text" name="name" className={inputBaseClass} placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className={labelClass}>Roll No. <span className="text-brand-orange">*</span></label>
                  <input type="text" name="roll_no" className={inputBaseClass} placeholder="Enter Roll No." value={formData.roll_no} onChange={handleChange} required />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className={labelClass}>Email <span className="text-brand-orange">*</span></label>
                  <input type="email" name="email" className={inputBaseClass} placeholder="Email address" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className={labelClass}>Phone <span className="text-brand-orange">*</span></label>
                  <input type="tel" name="phone" className={inputBaseClass} placeholder="Phone number" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="flex flex-col gap-2.5 md:col-span-2">
                  <label className={labelClass}>Year of Study <span className="text-brand-orange">*</span></label>
                  <div className="flex flex-col md:flex-row bg-bg-input p-1 rounded-md border border-border-custom">
                    {['1st', '2nd', '3rd', '4th'].map((y) => (
                      <label key={y} className="flex items-center justify-center gap-2.5 cursor-pointer flex-1 py-3 px-5 transition-all duration-300 text-[15px] text-text-secondary font-semibold relative overflow-hidden rounded-[4px] has-[:checked]:bg-brand-orange has-[:checked]:text-bg-deep hover:text-text-primary">
                        <input type="radio" name="year" value={`${y} Year`} onChange={handleChange} required className="absolute opacity-0 w-0 h-0" />
                        <span>{y} Year</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 md:col-span-2">
                  <label className={labelClass}>Branch / Specialization <span className="text-brand-orange">*</span></label>
                  <input type="text" name="branch" className={inputBaseClass} placeholder="Enter branch/specialization" value={formData.branch} onChange={handleChange} required />
                </div>
              </div>
            </div>
          </div>

          {/* 03: Workshop Details */}
          <div className={formCardClass}>
            <div className={sectionHeaderClass}>
              <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">03</span>
              <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Workshop Details</span>
            </div>
            <div className="p-6 md:p-9">
              <div className="flex items-center gap-4 bg-brand-glow border border-brand-orange/30 border-l-4 border-l-brand-orange p-5 rounded-md text-[15px] text-text-secondary mb-7">
                <svg className="text-brand-orange w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                <div><strong className="text-text-primary">Workshop Name:</strong> CAD and CAE Workshop for University Students</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] md:gap-[2px] bg-border-custom rounded-md overflow-hidden border border-border-custom">
                {[
                  { label: 'Date', name: 'date', placeholder: 'DD / MM / YYYY' },
                  { label: 'Time', name: 'time', placeholder: 'e.g. 09:00 AM' },
                  { label: 'Location', name: 'location', placeholder: 'Enter location' }
                ].map((item) => (
                  <div key={item.name} className="bg-bg-input p-4 md:px-5 md:py-6 flex flex-col">
                    <div className="text-[13px] font-bold uppercase tracking-[1px] text-brand-orange mb-3">{item.label}</div>
                    <input type="text" name={item.name} placeholder={item.placeholder} value={formData[item.name]} onChange={handleChange} className="bg-transparent border-none p-0 font-rajdhani text-[22px] font-semibold text-text-primary outline-none w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 04: Registration Details */}
          <div className={formCardClass}>
            <div className={sectionHeaderClass}>
              <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">04</span>
              <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Registration Details</span>
            </div>
            <div className="p-6 md:p-9">
              <div className="grid grid-cols-1 gap-5 md:gap-y-7">
                <div className="flex flex-col gap-2.5">
                  <label className={labelClass}>Registration Fee</label>
                  <input type="text" name="reg_fee" className={inputBaseClass} placeholder="₹ [Insert fee]" value={formData.reg_fee} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className={labelClass}>Payment Method <span className="text-brand-orange">*</span></label>
                  <div className="flex flex-col md:flex-row flex-wrap gap-3">
                    {['Online Payment', 'Bank Transfer', 'Cheque/DD'].map(method => (
                      <label key={method} className={radioOptionClass}>
                        <input type="radio" name="payment_method" value={method} onChange={handlePaymentChange} required className="absolute opacity-0" />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 05: Payment Details */}
          <div className={formCardClass}>
            <div className={sectionHeaderClass}>
              <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">05</span>
              <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Payment Details</span>
            </div>
            <div className="p-6 md:p-9">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-7 md:gap-x-8">
                <div className="flex flex-col gap-2.5">
                  <label className={labelClass}>Amount <span className="text-brand-orange">*</span></label>
                  <input type="text" name="amount" className={inputBaseClass} placeholder="₹" value={formData.amount} onChange={handleChange} required />
                </div>

                {/* Conditional Payment Sections */}
                {paymentMethod === 'Online Payment' && (
                  <div className="flex flex-col gap-2.5 animate-fade-up-fast">
                    <label className={labelClass}>Transaction ID <span className="text-brand-orange">*</span></label>
                    <input type="text" name="transaction_id" className={inputBaseClass} placeholder="Transaction ID" value={formData.transaction_id} onChange={handleChange} required />
                  </div>
                )}

                {paymentMethod === 'Bank Transfer' && (
                  <div className="flex flex-col gap-2.5 animate-fade-up-fast">
                    <label className={labelClass}>Bank Name <span className="text-brand-orange">*</span></label>
                    <input type="text" name="bank_name" className={inputBaseClass} placeholder="Bank Name" value={formData.bank_name} onChange={handleChange} required />
                  </div>
                )}

                {paymentMethod === 'Cheque/DD' && (
                  <div className="flex flex-col gap-2.5 animate-fade-up-fast">
                    <label className={labelClass}>Cheque / DD No. <span className="text-brand-orange">*</span></label>
                    <input type="text" name="cheque_no" className={inputBaseClass} placeholder="Cheque / DD No." value={formData.cheque_no} onChange={handleChange} required />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 06: Additional Information */}
          <div className={formCardClass}>
            <div className={sectionHeaderClass}>
              <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">06</span>
              <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Additional Information</span>
            </div>
            <div className="p-6 md:p-9">
              <div className="grid grid-cols-1 gap-5 md:gap-y-7">
                <div className="flex flex-col gap-2.5">
                  <label className={labelClass}>Do you have prior experience with CAD/CAE software? <span className="text-brand-orange">*</span></label>
                  <div className="flex flex-wrap gap-3">
                    <label className={radioOptionClass}>
                      <input type="radio" name="prior_exp" value="Yes" onChange={handleChange} required className="absolute opacity-0" /><span>Yes</span>
                    </label>
                    <label className={radioOptionClass}>
                      <input type="radio" name="prior_exp" value="No" onChange={handleChange} className="absolute opacity-0" /><span>No</span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className={labelClass}>What do you expect to learn from this workshop? <span className="text-brand-orange">*</span></label>
                  <textarea name="expectations" className={`${inputBaseClass} resize-y min-h-[120px] leading-relaxed`} placeholder="Your expectations..." value={formData.expectations} onChange={handleChange} required></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* 07: Declaration */}
          <div className={formCardClass}>
            <div className={sectionHeaderClass}>
              <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">07</span>
              <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Declaration</span>
            </div>
            <div className="p-6 md:p-9">
              <ul className="flex flex-col gap-6 list-none m-0 p-0">
                {[
                  { name: 'decl_accuracy', text: 'I hereby declare that the information provided is true and accurate to the best of my knowledge.', required: true },
                  { name: 'decl_rules', text: 'I agree to abide by the rules and regulations of the workshop.', required: true }
                ].map((item) => (
                  <li key={item.name} className="flex items-start gap-4 text-[15px] text-text-secondary leading-relaxed">
                    <div className="relative w-6 h-6 shrink-0 mt-0.5">
                      <input type="checkbox" name={item.name} id={item.name} checked={formData[item.name]} onChange={handleChange} required={item.required} className="peer opacity-0 absolute inset-0 cursor-pointer z-10 w-full h-full m-0" />
                      <label htmlFor={item.name} className="absolute inset-0 bg-bg-input border-2 border-border-custom rounded transition-all duration-200 pointer-events-none peer-checked:bg-brand-orange peer-checked:border-brand-orange peer-focus:shadow-[0_0_0_3px_var(--color-brand-glow)] flex items-center justify-center">
                        <svg className="w-4 h-4 text-bg-deep opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </label>
                    </div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Note & Submit Block */}
          {!submitted ? (
            <>
              {/* Note for Students */}
              <div className="bg-[#20252a] rounded-lg overflow-hidden mb-8 border border-border-custom shadow-[0_10px_30px_rgba(0,0,0,0.15)] p-6 md:p-8 transition-all duration-300 hover:border-brand-orange/30">
                <div className="flex items-center gap-3 text-brand-orange mb-4">
                  <svg className="w-[22px] h-[22px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h4 className="font-bold text-text-primary uppercase tracking-[1.5px] text-[15px] m-0">
                    Note for Students:
                  </h4>
                </div>
                <ul className="list-disc pl-9 space-y-2 m-0 text-[14px] md:text-[15px] text-text-secondary leading-relaxed marker:text-brand-orange/60">
                  <li>Please bring a valid university ID card on the day of the workshop.</li>
                  <li>Registration fee is non-refundable.</li>
                  <li>Limited seats available, register early!</li>
                </ul>
              </div>

              {/* Submit Button Area */}
              <div className="flex flex-col items-center gap-5 w-full mb-16">
                <p className="text-[14px] text-text-muted m-0">
                  Fields marked with <span className="text-brand-orange">*</span> are mandatory
                </p>
                
                <button type="submit" disabled={isSubmitting} className="bg-brand-orange text-bg-deep font-rajdhani text-[20px] font-bold tracking-[2px] border-none rounded-md py-5 px-12 cursor-pointer transition-all duration-300 w-full max-w-[450px] flex items-center justify-center shadow-[0_4px_15px_rgba(245,166,35,0.2)] hover:bg-brand-hover hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgba(245,166,35,0.4)] disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none">
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin w-6 h-6" viewBox="0 0 50 50">
                        <circle className="animate-dash stroke-bg-deep" cx="25" cy="25" r="20" fill="none" strokeWidth="5" strokeLinecap="round"></circle>
                      </svg>
                      PROCESSING...
                    </span>
                  ) : 'SUBMIT REGISTRATION'}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-[60px] px-10 bg-bg-card rounded-lg border-t-[6px] border-t-[#2ecc71] shadow-[0_10px_30px_rgba(0,0,0,0.2)] animate-fade-up mb-16">
              <div className="w-[80px] h-[80px] rounded-full bg-[#2ecc71]/10 text-[#2ecc71] flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 className="font-rajdhani text-[32px] text-[#2ecc71] mb-4">Registration Successful</h3>
              <p className="text-[18px] text-text-secondary">Your details have been securely transmitted to the workshop team.</p>
              <p className="mt-4 text-[15px] text-text-muted">
                A confirmation email will be sent to <strong className="text-text-primary">{formData.email}</strong> after verification.
              </p>
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setIsSubmitting(false);
                    setFormData({
                      university_name: '', department: '', name: '', roll_no: '', email: '', phone: '',
                      branch: '', year: '', date: '', time: '', location: '', reg_fee: '',
                      amount: '', payment_method: '', transaction_id: '', bank_name: '',
                      cheque_no: '', prior_exp: '', expectations: '', decl_accuracy: false,
                      decl_rules: false
                    });
                    setPaymentMethod('');
                  }}
                  className="!bg-transparent border-2 border-brand-orange !text-brand-orange font-rajdhani text-[20px] font-bold tracking-[2px] rounded-md py-4 px-8 cursor-pointer transition-all duration-300 shadow-none hover:!bg-brand-orange hover:!text-bg-deep"
                >
                  REGISTER ANOTHER STUDENT
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  )
}

export default App