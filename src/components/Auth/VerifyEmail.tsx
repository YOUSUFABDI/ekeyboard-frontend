import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useVerifyOtpMutation } from '../../store/auth/authApi' // Adjust path to your authApi
import { setPageTitle } from '../../store/themeConfigSlice'
import { AuthResponse, ApiErrorResponseDT } from '../../lib/types'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const VerifyEmail = () => {
    const [otp, setOtp] = useState('')
    const [verifyOtp, { isLoading, error, isError, data }] = useVerifyOtpMutation()
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const email = location.state?.email || '' // Passed from Signup page

    useEffect(() => {
        dispatch(setPageTitle('Verify Email'))

        if (isError) {
            let errorMessage = 'An error occurred'
            if (error && 'data' in error) {
                const errorData = error.data as ApiErrorResponseDT
                errorMessage = errorData?.error?.message || errorMessage
            }

            toast.fire({
                icon: 'error',
                title: errorMessage,
                padding: '2em',
            })
        }

        if (data && 'payload' in data) {
            if (data?.payload?.data?.token) {
                const { token, role } = data?.payload?.data

                localStorage.setItem('token', token)
                localStorage.setItem('role', role)

                navigate(role === 'admin' ? '/dashboard' : '/')
                window.location.reload()
            }
        }
    }, [data, error, isError, navigate, dispatch])

    const handleOtpChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOtp(event.target.value)
    }

    const handleVerifyOtp = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!otp || !email) {
            toast.fire({
                icon: 'error',
                title: 'OTP or email is missing!',
            })
            return
        }

        try {
            await verifyOtp({ email, otp: parseInt(otp, 10) }).unwrap()
            toast.fire({
                icon: 'success',
                title: 'Verification successful!',
            })
        } catch (err) {
            console.error('Verification Error:', err)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded p-6">
                <h1 className="text-2xl font-bold text-center">Verify Your Email</h1>
                <p className="mt-4 text-center">
                    Enter the OTP sent to <strong>{email}</strong>
                </p>
                <form className="mt-6 space-y-4" onSubmit={handleVerifyOtp}>
                    <input type="text" name="otp" value={otp} onChange={handleOtpChange} placeholder="Enter OTP" className="form-input w-full" />
                    <button type="submit" disabled={isLoading} className="btn bg-primary text-white w-full uppercase">
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default VerifyEmail
