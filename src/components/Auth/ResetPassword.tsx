import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useResetPasswordMutation } from '../../store/auth/authApi'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../store/themeConfigSlice'
import { ApiErrorResponseDT } from '../../lib/types'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
    timerProgressBar: true,
})

const ResetPassword: React.FC = () => {
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [resetPassword, { isLoading, error, isError }] = useResetPasswordMutation()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle('Reset password'))

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
    }, [error, isError, navigate, dispatch])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (!otp.trim() || !newPassword.trim() || !confirmPassword.trim()) {
                toast.fire({
                    icon: 'error',
                    title: 'Please fill in all fields.',
                })
                return
            }

            if (newPassword !== confirmPassword) {
                toast.fire({
                    icon: 'error',
                    title: 'Passwords do not match.',
                })
                return
            }

            await resetPassword({ otp: parseInt(otp), newPassword }).unwrap()

            toast.fire({
                icon: 'success',
                title: 'Password reset successfully.',
            })

            navigate('/login')
            window.location.reload()
        } catch (err: any) {
            console.error('Reset Password Error:', err)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Reset Password</h2>
                <p className="mt-2 text-sm text-gray-600 text-center">Enter the OTP sent to your email and your new password.</p>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                            OTP
                        </label>
                        <input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="btn bg-primary text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
