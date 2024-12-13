import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ApiErrorResponseDT } from '../../lib/types'
import { useSignupMutation } from '../../store/auth/authApi' // Adjust to your mutation hook name
import { setPageTitle } from '../../store/themeConfigSlice'
import IconEye from '../Icon/IconEye'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const Signup = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        age: '',
        username: '',
        password: '',
    })

    const [signup, { isLoading, error, isError }] = useSignupMutation()
    const navigate = useNavigate()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle('Sign Up'))

        if (isError) {
            let errorMessage = 'An error occurred'
            if ((error as any)?.data) {
                const errorData = (error as any).data as ApiErrorResponseDT
                errorMessage = errorData.error.message
            }

            toast.fire({
                icon: 'error',
                title: errorMessage,
                padding: '2em',
            })
        }
    }, [error, isError, dispatch])

    const handleSignup = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            // Validate age as a number
            if (!formData.age || isNaN(Number(formData.age))) {
                toast.fire({
                    icon: 'error',
                    title: 'Please enter a valid age.',
                })
                return
            }

            // Execute sign-up mutation
            const response = await signup({ ...formData, age: Number(formData.age) }).unwrap()

            toast.fire({
                icon: 'success',
                title: response.payload?.message || 'Sign-up successful!',
            })

            // Navigate to the OTP verification page with the user's email
            navigate('/verify-email', { state: { email: formData.email } })
        } catch (err) {
            console.error('Sign-up Error:', err)
        }
    }

    return (
        <div>
            <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-primary p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <div className=" hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/auth/register.svg" alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div>
                    {/* Signup Form */}
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign Up</h1>
                            <p className="text-base font-bold leading-normal text-white-dark">Register to create an account</p>
                            <form className="space-y-5 dark:text-white" onSubmit={handleSignup}>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" className="form-input w-full" />
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="form-input w-full" />
                                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="form-input w-full" />
                                <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="form-input w-full" />
                                <input type="text" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" className="form-input w-full" />
                                <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" className="form-input w-full" />
                                <div className="relative">
                                    <input
                                        type={isShowPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Password"
                                        className="form-input w-full"
                                    />
                                    <span onClick={() => setIsShowPassword(!isShowPassword)} className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                                        <IconEye />
                                    </span>
                                </div>
                                <button type="submit" disabled={isLoading} className="btn bg-primary text-white w-full uppercase">
                                    {isLoading ? 'Signing up...' : 'Sign up'}
                                </button>
                            </form>
                            <p className="mt-5 text-center">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
