import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ApiErrorResponseDT } from '../../lib/types'
import { useForgotPasswordMutation } from '../../store/auth/authApi'
import { setPageTitle } from '../../store/themeConfigSlice'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
    timerProgressBar: true,
})

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('')
    const [forgotPassword, { isLoading, error, isError }] = useForgotPasswordMutation()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle('Forgot password'))

        if (isError) {
            let errorMessage = 'An error occurred'
            if ((error as any).data) {
                const errorData = (error as any).data as ApiErrorResponseDT
                errorMessage = errorData.error.message
            }

            toast.fire({
                icon: 'error',
                title: errorMessage,
                padding: '2em',
            })
        }
    }, [, error, isError, navigate, dispatch])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (!email.trim()) {
                toast.fire({
                    icon: 'error',
                    title: 'Please enter a valid email address.',
                })
                return
            }

            await forgotPassword({ email }).unwrap()

            toast.fire({
                icon: 'success',
                title: `OTP sent successfully to ${email}`,
            })

            navigate('/reset-password')
            window.location.reload()
        } catch (err: any) {
            console.error('Forgot Password Error:', err)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Forgot Password</h2>
                <p className="mt-2 text-sm text-gray-600 text-center">Enter your email, and we'll send you an OTP to reset your password.</p>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="btn bg-primary text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                        {isLoading ? 'Sending...' : 'Send OTP'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
