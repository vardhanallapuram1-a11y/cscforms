import { useState } from 'react'

function App() {
  const [view, setView] = useState('home')
  const [formData, setFormData] = useState({
    university_name: '', department: '', name: '', roll_no: '', email: '', phone: '',
    branch: '', year: '', date: '', time: '', location: '', reg_fee: '',
    amount: '', payment_method: '', transaction_id: '', bank_name: '',
    cheque_no: '', prior_exp: '', expectations: '', decl_accuracy: false, decl_rules: false
  })

  // Course Registration State
  const [courseStep, setCourseStep] = useState(1)
  const [courseFormData, setCourseFormData] = useState({
    // Step 1: Personal & Contact
    name: '', dob: '', gender: '',
    email: '', mobile: '', alt_phone: '',
    city: '', state: '', pincode: '', country: 'India',
    // Step 2: Academic & Course
    qualification: '', university: '', status: '',
    course_category: '', specific_course: '',
    learning_mode: 'Online', batch_preference: '', start_month: '',
    experience_level: '', career_goal: '',
    referral_source: '', referral_code: '',
    payment_plan: '', coupon_code: '',
    decl_accuracy: false, decl_terms: false
  })

  const [paymentMethod, setPaymentMethod] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (view === 'course') {
      setCourseFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
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
    const dataToSubmit = view === 'course' ? courseFormData : formData
    Object.keys(dataToSubmit).forEach(key => {
      formDataToSend.append(key, dataToSubmit[key])
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
  const formCardClass = "bg-bg-card border border-border-custom rounded-xl mb-7 overflow-hidden transition-all duration-300 hover:border-brand-orange/30 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
  const sectionHeaderClass = "bg-bg-input/30 border-b border-border-custom p-4 md:p-5 flex items-center gap-4"
  const labelClass = "font-rajdhani font-bold text-[14px] md:text-[15px] uppercase tracking-[1px] text-text-secondary"
  const inputBaseClass = "bg-bg-input border-2 border-border-custom rounded-md p-3.5 md:p-4 text-text-primary text-[15px] md:text-[16px] outline-none transition-all duration-300 focus:border-brand-orange/50 focus:shadow-[0_0_0_4px_rgba(245,166,35,0.05)] placeholder:text-text-muted/50 w-full"
  const radioOptionClass = "relative flex-1 min-w-[120px] bg-bg-input border-2 border-border-custom rounded-md p-3 md:p-4 flex items-center justify-center text-center cursor-pointer transition-all duration-300 hover:border-brand-orange/30 has-[:checked]:border-brand-orange has-[:checked]:bg-brand-glow has-[:checked]:text-brand-orange font-rajdhani font-bold text-[15px] md:text-[16px] uppercase tracking-[1px]"

  const renderHome = () => (
    <div className="w-full max-w-[900px] mx-auto mt-16 px-5 animate-fade-up">
      <div className="text-center mb-16">
        <h1 className="font-rajdhani text-[36px] md:text-[48px] font-bold uppercase tracking-[2px] text-text-primary mb-4">
          Experience <span className="text-brand-orange">Engineering Excellence</span>
        </h1>
        <p className="text-[18px] text-text-secondary max-w-[600px] mx-auto leading-relaxed">
          Select a registration portal to begin your journey towards mastering technical skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {/* Course Registration Card */}
        <div
          onClick={() => setView('course')}
          className="group relative bg-bg-card border border-border-custom rounded-xl p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-brand-orange/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full -mr-10 -mt-10 transition-all duration-500 group-hover:bg-brand-orange/10 group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-brand-glow border border-brand-orange/20 rounded-lg flex items-center justify-center mb-6 text-brand-orange group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-rajdhani text-[24px] font-bold uppercase tracking-[1px] text-text-primary mb-3">Course Registration</h3>
            <p className="text-text-muted text-[15px] leading-relaxed mb-6">
              Access comprehensive courses in mechanical design, structural analysis, and thermal engineering.
            </p>
            <div className="flex items-center gap-2 text-brand-orange font-bold text-[14px] uppercase tracking-[1px]">
              Access Portal <svg className="w-4 h-4 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
        </div>

        {/* Workshop Registration Card */}
        <div
          onClick={() => setView('workshop')}
          className="group relative bg-bg-card border-2 border-brand-orange/30 rounded-xl p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-brand-orange/60 hover:shadow-[0_20px_40px_rgba(245,166,35,0.15)] shadow-[0_10px_30px_rgba(245,166,35,0.05)]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-bl-full -mr-10 -mt-10 transition-all duration-500 group-hover:bg-brand-orange/20 group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-brand-orange text-bg-deep rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-rajdhani text-[24px] font-bold uppercase tracking-[1px] text-text-primary mb-3">Workshop Registration</h3>
            <p className="text-text-muted text-[15px] leading-relaxed mb-6">
              Join intensive practical sessions on CAD/CAE software used in modern industries.
            </p>
            <div className="flex items-center gap-2 text-brand-orange font-bold text-[14px] uppercase tracking-[1px]">
              Explore Workshops <svg className="w-4 h-4 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCourseForm = () => (
    <div className="w-full max-w-[850px] mx-auto mt-[60px] px-5 animate-fade-up">
      <button
        onClick={() => setView('home')}
        className="flex items-center gap-2 text-text-muted mb-8 hover:text-brand-orange transition-colors duration-300 font-semibold uppercase tracking-[1px] text-[13px]"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Selection
      </button>

      <div className="mb-12 text-center">
        <h1 className="font-rajdhani text-[32px] md:text-[42px] font-bold uppercase tracking-[1.5px] text-text-primary mb-3 leading-tight">
          THE CORRECT STEPS – <span className="text-brand-orange">CAD, CAE & DESIGN COURSES</span>
        </h1>
        <div className="flex justify-center items-center gap-4 mt-8">
          <div className={`flex items-center gap-3 ${courseStep === 1 ? 'text-brand-orange' : 'text-text-muted'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${courseStep === 1 ? 'border-brand-orange bg-brand-glow' : 'border-text-muted'}`}>1</span>
            <span className="font-rajdhani font-bold tracking-[1px] uppercase hidden md:inline">Personal Information</span>
          </div>
          <div className="w-12 h-[2px] bg-border-custom"></div>
          <div className={`flex items-center gap-3 ${courseStep === 2 ? 'text-brand-orange' : 'text-text-muted'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${courseStep === 2 ? 'border-brand-orange bg-brand-glow' : 'border-text-muted'}`}>2</span>
            <span className="font-rajdhani font-bold tracking-[1px] uppercase hidden md:inline">Academic & Course</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {courseStep === 1 ? (
          <div className="animate-fade-up">
            {/* 01: Personal Details */}
            <div className={formCardClass}>
              <div className={sectionHeaderClass}>
                <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">01</span>
                <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Personal Details</span>
              </div>
              <div className="p-6 md:p-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-7 md:gap-x-8">
                  <div className="flex flex-col gap-2.5 md:col-span-2">
                    <label className={labelClass}>Full Name <span className="text-brand-orange">*</span></label>
                    <input type="text" name="name" className={inputBaseClass} placeholder="Enter your full name" value={courseFormData.name} onChange={handleChange} required />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>Date of Birth <span className="text-brand-orange">*</span></label>
                    <input type="date" name="dob" className={inputBaseClass} value={courseFormData.dob} onChange={handleChange} required />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>Gender <span className="text-brand-orange">*</span></label>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {['Male', 'Female', 'Other'].map(g => (
                        <label key={g} className={`${radioOptionClass} min-w-0`}>
                          <input type="radio" name="gender" value={g} checked={courseFormData.gender === g} onChange={handleChange} required className="absolute opacity-0" />
                          <span>{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 02: Contact Information */}
            <div className={formCardClass}>
              <div className={sectionHeaderClass}>
                <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">02</span>
                <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Contact Information</span>
              </div>
              <div className="p-6 md:p-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-7 md:gap-x-8">
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>Email Address <span className="text-brand-orange">*</span></label>
                    <input type="email" name="email" className={inputBaseClass} placeholder="Email address" value={courseFormData.email} onChange={handleChange} required />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>Mobile Number <span className="text-brand-orange">*</span></label>
                    <input type="tel" name="mobile" className={inputBaseClass} placeholder="Mobile number" value={courseFormData.mobile} onChange={handleChange} required />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>Alternate Phone</label>
                    <input type="tel" name="alt_phone" className={inputBaseClass} placeholder="Optional" value={courseFormData.alt_phone} onChange={handleChange} />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>City <span className="text-brand-orange">*</span></label>
                    <input type="text" name="city" className={inputBaseClass} placeholder="Enter your city" value={courseFormData.city} onChange={handleChange} required />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>State <span className="text-brand-orange">*</span></label>
                    <input type="text" name="state" className={inputBaseClass} placeholder="Enter your state" value={courseFormData.state} onChange={handleChange} required />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>Pincode <span className="text-brand-orange">*</span></label>
                    <input type="text" name="pincode" className={inputBaseClass} placeholder="6-digit pincode" value={courseFormData.pincode} onChange={handleChange} required />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mb-16">
              <button
                type="button"
                onClick={() => setCourseStep(2)}
                className="bg-brand-orange text-bg-deep font-rajdhani text-[18px] font-bold tracking-[2px] border-none rounded-md py-4 px-10 cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(245,166,35,0.2)] hover:bg-brand-hover hover:-translate-y-1"
              >
                NEXT: ACADEMIC DETAILS
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-up">
            {/* 03: Educational Background */}
            <div className={formCardClass}>
              <div className={sectionHeaderClass}>
                <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">03</span>
                <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Educational Background</span>
              </div>
              <div className="p-6 md:p-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-7 md:gap-x-8">
                  <div className="flex flex-col gap-2.5 md:col-span-2">
                    <label className={labelClass}>Highest Qualification <span className="text-brand-orange">*</span></label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {['10th', '12th', 'Diploma', 'B.Tech / B.E', 'M.Tech', 'Other'].map(q => (
                        <label key={q} className={`${radioOptionClass} min-w-0`}>
                          <input type="radio" name="qualification" value={q} checked={courseFormData.qualification === q} onChange={handleChange} required className="absolute opacity-0" />
                          <span>{q}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5 md:col-span-2">
                    <label className={labelClass}>College / University Name <span className="text-brand-orange">*</span></label>
                    <input type="text" name="university" className={inputBaseClass} placeholder="Enter your college or university" value={courseFormData.university} onChange={handleChange} required />
                  </div>
                  <div className="flex flex-col gap-2.5 md:col-span-2">
                    <label className={labelClass}>Current Status <span className="text-brand-orange">*</span></label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['Student', 'Graduate', 'Working Professional'].map(s => (
                        <label key={s} className={`${radioOptionClass} min-w-0`}>
                          <input type="radio" name="status" value={s} checked={courseFormData.status === s} onChange={handleChange} required className="absolute opacity-0" />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 04: Course Selection */}
            <div className={formCardClass}>
              <div className={sectionHeaderClass}>
                <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">04</span>
                <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Course Selection</span>
              </div>
              <div className="p-6 md:p-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-7 md:gap-x-8">
                  <div className="flex flex-col gap-2.5 md:col-span-2">
                    <label className={labelClass}>Select Course Category <span className="text-brand-orange">*</span></label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {['CAD Design', 'CAE / Simulation', 'Graphic Designing', '3D Design & Modeling', 'CAD + CAE', 'Physics of Design'].map(c => (
                        <label key={c} className={`${radioOptionClass} min-w-0 h-auto py-4 px-2`}>
                          <input type="radio" name="course_category" value={c} checked={courseFormData.course_category === c} onChange={handleChange} required className="absolute opacity-0" />
                          <span className="leading-tight">{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5 md:col-span-2">
                    <label className={labelClass}>Preferred Course <span className="text-brand-orange">*</span></label>
                    <select name="specific_course" className={inputBaseClass} value={courseFormData.specific_course} onChange={handleChange} required>
                      <option value="">Select a course</option>
                      {courseFormData.course_category === 'CAD Design' && (
                        <>
                          <option value="AutoCAD">AutoCAD</option>
                          <option value="SolidWorks">SolidWorks</option>
                          <option value="CATIA">CATIA</option>
                        </>
                      )}
                      {courseFormData.course_category === 'CAE / Simulation' && (
                        <>
                          <option value="ANSYS">ANSYS</option>
                          <option value="HyperMesh">HyperMesh</option>
                          <option value="CFD Simulation">CFD Simulation</option>
                        </>
                      )}
                      {courseFormData.course_category === 'Graphic Designing' && (
                        <>
                          <option value="Graphic Design">Graphic Design</option>
                          <option value="Motion Graphics">Motion Graphics</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                        </>
                      )}
                      {courseFormData.course_category === '3D Design & Modeling' && (
                        <>
                          <option value="3D Modeling">3D Modeling</option>
                          <option value="3D Rendering">3D Rendering</option>
                          <option value="Fusion 360">Fusion 360</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 05: Batch & Schedule */}
            <div className={formCardClass}>
              <div className={sectionHeaderClass}>
                <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">05</span>
                <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Batch & Schedule</span>
              </div>
              <div className="p-6 md:p-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-7 md:gap-x-8">
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>Batch Preference <span className="text-brand-orange">*</span></label>
                    <div className="grid grid-cols-1 gap-2">
                      {['Weekday Batch', 'Weekend Batch', 'Flexible Timing'].map(b => (
                        <label key={b} className={`${radioOptionClass} min-w-0 justify-start px-6`}>
                          <input type="radio" name="batch_preference" value={b} checked={courseFormData.batch_preference === b} onChange={handleChange} required className="absolute opacity-0" />
                          <span>{b}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>Start Month <span className="text-brand-orange">*</span></label>
                    <select name="start_month" className={inputBaseClass} value={courseFormData.start_month} onChange={handleChange} required>
                      <option value="">Select Month / Year</option>
                      <option value="April 2026">April 2026</option>
                      <option value="May 2026">May 2026</option>
                      <option value="June 2026">June 2026</option>
                      <option value="July 2026">July 2026</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 06: Experience & Goals */}
            <div className={formCardClass}>
              <div className={sectionHeaderClass}>
                <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">06</span>
                <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Experience & Goals</span>
              </div>
              <div className="p-6 md:p-9">
                <div className="grid grid-cols-1 gap-5 md:gap-y-7">
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>Experience Level <span className="text-brand-orange">*</span></label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['Beginner', 'Intermediate', 'Advanced'].map(l => (
                        <label key={l} className={`${radioOptionClass} min-w-0`}>
                          <input type="radio" name="experience_level" value={l} checked={courseFormData.experience_level === l} onChange={handleChange} required className="absolute opacity-0" />
                          <span>{l}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>Why do you want to join this course? <span className="text-brand-orange">*</span></label>
                    <textarea name="career_goal" className={`${inputBaseClass} resize-y min-h-[120px] leading-relaxed`} placeholder="Your career goals and expectations..." value={courseFormData.career_goal} onChange={handleChange} required></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* 07: Referral & Payment */}
            <div className={formCardClass}>
              <div className={sectionHeaderClass}>
                <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">07</span>
                <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Referral & Payment</span>
              </div>
              <div className="p-6 md:p-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-7 md:gap-x-8">
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>How did you hear about us? <span className="text-brand-orange">*</span></label>
                    <select name="referral_source" className={inputBaseClass} value={courseFormData.referral_source} onChange={handleChange} required>
                      <option value="">Select option</option>
                      <option value="Instagram">Instagram</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Friends">Friends / Referral</option>
                      <option value="Website">Website</option>
                      <option value="Workshop">Workshop / Webinar</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>Referral Code</label>
                    <input type="text" name="referral_code" className={inputBaseClass} placeholder="Optional" value={courseFormData.referral_code} onChange={handleChange} />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>Calculation Plan <span className="text-brand-orange">*</span></label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Full Payment', 'Installments'].map(p => (
                        <label key={p} className={`${radioOptionClass} min-w-0`}>
                          <input type="radio" name="payment_plan" value={p} checked={courseFormData.payment_plan === p} onChange={handleChange} required className="absolute opacity-0" />
                          <span>{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className={labelClass}>Coupon Code</label>
                    <input type="text" name="coupon_code" className={inputBaseClass} placeholder="If any" value={courseFormData.coupon_code} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            {/* 08: Declaration */}
            <div className={formCardClass}>
              <div className={sectionHeaderClass}>
                <span className="font-rajdhani text-[24px] font-bold text-brand-orange opacity-80">08</span>
                <span className="font-rajdhani text-[20px] font-semibold tracking-[1.5px] uppercase text-text-primary">Declaration</span>
              </div>
              <div className="p-6 md:p-9">
                <ul className="flex flex-col gap-6 list-none m-0 p-0">
                  <li className="flex items-start gap-4 text-[15px] text-text-secondary leading-relaxed">
                    <div className="relative w-6 h-6 shrink-0 mt-0.5">
                      <input type="checkbox" name="decl_accuracy" checked={courseFormData.decl_accuracy} onChange={handleChange} required className="peer opacity-0 absolute inset-0 cursor-pointer z-10 w-full h-full m-0" />
                      <label className="absolute inset-0 bg-bg-input border-2 border-border-custom rounded transition-all duration-200 pointer-events-none peer-checked:bg-brand-orange peer-checked:border-brand-orange peer-focus:shadow-[0_0_0_3px_var(--color-brand-glow)] flex items-center justify-center">
                        <svg className="w-4 h-4 text-bg-deep opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </label>
                    </div>
                    <span>I confirm that the information provided is correct.</span>
                  </li>
                  <li className="flex items-start gap-4 text-[15px] text-text-secondary leading-relaxed">
                    <div className="relative w-6 h-6 shrink-0 mt-0.5">
                      <input type="checkbox" name="decl_terms" checked={courseFormData.decl_terms} onChange={handleChange} required className="peer opacity-0 absolute inset-0 cursor-pointer z-10 w-full h-full m-0" />
                      <label className="absolute inset-0 bg-bg-input border-2 border-border-custom rounded transition-all duration-200 pointer-events-none peer-checked:bg-brand-orange peer-checked:border-brand-orange peer-focus:shadow-[0_0_0_3px_var(--color-brand-glow)] flex items-center justify-center">
                        <svg className="w-4 h-4 text-bg-deep opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </label>
                    </div>
                    <span>I agree to the terms and conditions of The Correct Steps.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center gap-5 w-full mb-16">
              <div className="flex gap-4 w-full max-w-[450px]">
                <button type="button" onClick={() => setCourseStep(1)} className="flex-1 bg-bg-input text-text-primary font-rajdhani text-[18px] font-bold tracking-[1px] border-2 border-white/10 rounded-md py-4 cursor-pointer hover:border-brand-orange transition-all">BACK</button>
                <button type="submit" disabled={isSubmitting} className="flex-[2] bg-brand-orange text-bg-deep font-rajdhani text-[20px] font-bold tracking-[2px] border-none rounded-md py-4 cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(245,166,35,0.2)] hover:bg-brand-hover hover:shadow-[0_8px_25px_rgba(245,166,35,0.4)] disabled:opacity-50">
                  {isSubmitting ? 'PROCESSING...' : 'SUBMIT REGISTRATION'}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )

  return (
    <>
      {/* Brand Header */}
      <header className="bg-bg-header border-b-2 border-brand-orange shadow-[0_4px_20px_rgba(0,0,0,0.2)] sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto py-4 md:py-5 px-4 flex justify-center items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('home')}>
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

      {view === 'home' ? renderHome() : view === 'course' ? renderCourseForm() : (
        <div className="w-full max-w-[850px] mx-auto mt-[60px] px-5 animate-fade-up">
          <button
            onClick={() => setView('home')}
            className="flex items-center gap-2 text-text-muted mb-8 hover:text-brand-orange transition-colors duration-300 font-semibold uppercase tracking-[1px] text-[13px]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Selection
          </button>

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
                      setCourseFormData({
                        name: '', dob: '', gender: '',
                        email: '', mobile: '', alt_phone: '',
                        city: '', state: '', pincode: '', country: 'India',
                        qualification: '', university: '', status: '',
                        course_category: '', specific_course: '',
                        learning_mode: 'Online', batch_preference: '', start_month: '',
                        experience_level: '', career_goal: '',
                        referral_source: '', referral_code: '',
                        payment_plan: '', coupon_code: '',
                        decl_accuracy: false, decl_terms: false
                      });
                      setCourseStep(1);
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
      )}
    </>
  )
}

export default App
