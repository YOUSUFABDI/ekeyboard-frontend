import { ChangeEvent, useEffect, useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { ApiErrorResponseDT, ApiSuccessResponseDT, UserDT } from '../../lib/types'
import { useChangeProfileImgMutation, useGetAuthenticatedUserQuery, useUpdateAdminInfoMutation, useUpdatePasswordMutation } from '../../store/auth/authApi'
import { setPageTitle } from '../../store/themeConfigSlice'
import IconEye from '../Icon/IconEye'
import IconHome from '../Icon/IconHome'
import IconLock from '../Icon/IconLock'

type PasswordVisibilityState = {
    current: boolean
    new: boolean
    confirm: boolean
}

type UpdateAdminInfoDT = {
    fullName: string
    age: number | undefined
    address: string
    phone: string
}

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const CustProfile = () => {
    const [tabs, setTabs] = useState<string>('home')
    const [passwordVisibility, setPasswordVisibility] = useState<PasswordVisibilityState>({
        current: false,
        new: false,
        confirm: false,
    })
    const [user, setUser] = useState<UserDT | null>(null)
    const [updatePasswordInput, setUpdatePasswordInput] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [image, setImage] = useState<ImageListType>([])

    const [updateAdminInfoInput, setUpdateAdminInfoInput] = useState<UpdateAdminInfoDT>({
        fullName: '',
        age: user?.age,
        address: '',
        phone: '',
    })

    const [changeProfileImg, { isLoading: Ischanging }] = useChangeProfileImgMutation()
    const { data, isError, error } = useGetAuthenticatedUserQuery()
    const [updatePassword, { data: Udata, isError: UisError, error: Uerror, isLoading: Uisloading }] = useUpdatePasswordMutation()
    const [updateAdminInfo, { data: UAdata, isError: UAisError, error: UAerror, isLoading: UAisLoading }] = useUpdateAdminInfoMutation()

    const dispatch = useDispatch()

    useEffect(() => {
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

        if (data && data.payload && !data.error) {
            const response = data as unknown as ApiSuccessResponseDT<{ user: UserDT }>
            setUser(response.payload.data.user)
        }
    }, [data, isError, error])

    useEffect(() => {
        if (Udata && Udata.payload && !Udata.error) {
            const response = Udata as unknown as ApiSuccessResponseDT<any>
            toast.fire({
                icon: 'success',
                title: response.payload.message,
                padding: '2em',
            })
        }

        if (UisError) {
            let errorMessage = 'An error occurred'
            if ((Uerror as any).data) {
                const errorData = (Uerror as any).data as ApiErrorResponseDT
                errorMessage = errorData.error.message
            }

            toast.fire({
                icon: 'error',
                title: errorMessage,
                padding: '2em',
            })
        }
    }, [Udata, UisError, Uerror, Uisloading])

    useEffect(() => {
        if (UAdata && UAdata.payload && !UAdata.error) {
            const response = UAdata as unknown as ApiSuccessResponseDT<any>
            toast.fire({
                icon: 'success',
                title: response.payload.message,
                padding: '2em',
            })
        }

        if (UAisError) {
            let errorMessage = 'An error occurred'
            if ((UAerror as any).data) {
                const errorData = (UAerror as any).data as ApiErrorResponseDT
                errorMessage = errorData.error.message
            }

            toast.fire({
                icon: 'error',
                title: errorMessage,
                padding: '2em',
            })
        }
    }, [UAisError, UAisLoading, UAerror])

    useEffect(() => {
        dispatch(setPageTitle('Account Setting'))
    }, [dispatch])

    const toggleTabs = (name: string) => {
        setTabs(name)
    }

    const handleUpdatePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUpdatePasswordInput({ ...updatePasswordInput, [name]: value })
    }

    const handleUpdateAdminInfoInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUpdateAdminInfoInput({
            ...updateAdminInfoInput,
            [name]: name === 'age' ? Number(value) : value,
        })
    }

    const togglePasswordVisibility = (key: keyof PasswordVisibilityState) => {
        setPasswordVisibility((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const handleUpdatePassword = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { currentPassword, newPassword, confirmPassword } = updatePasswordInput
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.fire({ icon: 'error', title: 'All fields are required' })
            return
        }

        if (newPassword !== confirmPassword) {
            toast.fire({ icon: 'error', title: 'Passwords do not match' })
            return
        }

        try {
            await updatePassword({ currentPassword, newPassword }).unwrap()
            toast.fire({ icon: 'success', title: 'Password updated successfully' })
            setUpdatePasswordInput({ currentPassword: '', newPassword: '', confirmPassword: '' })
        } catch (error) {
            toast.fire({ icon: 'error', title: 'Failed to update password' })
        }
    }

    const handleUpdateAdminInfo = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { fullName, address, phone, age } = updateAdminInfoInput
        if (!fullName || !address || !phone || age === undefined) {
            toast.fire({ icon: 'error', title: 'All fields are required' })
            return
        }

        try {
            await updateAdminInfo({ fullName, address, phone, age }).unwrap()
            toast.fire({ icon: 'success', title: 'Profile updated successfully' })
        } catch (error) {
            toast.fire({ icon: 'error', title: 'Failed to update profile' })
        }
    }

    const handleImageChange = (selectedImage: ImageListType) => {
        setImage(selectedImage)
        handleProfileImageSubmit(selectedImage)
    }

    const handleProfileImageSubmit = async (selectedImage: ImageListType) => {
        if (selectedImage.length === 0 || !selectedImage[0]?.file) {
            toast.fire({ icon: 'error', title: 'No image selected' })
            return
        }

        const image = selectedImage[0].dataURL as string

        try {
            const response = await changeProfileImg({ profileImg: image }).unwrap()
            toast.fire({ icon: 'success', title: response.payload.message })

            setUser((prev) => (prev ? { ...prev, photo: image } : prev))
            setImage([])
        } catch (err) {
            console.log(err)
            const errorMessage = (err as ApiErrorResponseDT)?.error?.message || 'Error updating profile image'
            toast.fire({ icon: 'error', title: errorMessage })
        }
    }

    return (
        <div className="">
            <div>
                <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                    <li className="inline-block">
                        <button
                            onClick={() => toggleTabs('home')}
                            className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
                        >
                            <IconHome />
                            Home
                        </button>
                    </li>
                    <li className="inline-block">
                        <button
                            onClick={() => toggleTabs('security')}
                            className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'security' ? '!border-primary text-primary' : ''}`}
                        >
                            <IconLock />
                            Security
                        </button>
                    </li>
                </ul>
            </div>
            {tabs === 'home' ? (
                <div>
                    <form onSubmit={handleUpdateAdminInfo} className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                        <h6 className="text-lg font-bold mb-5">General Information</h6>
                        <div className="flex flex-col sm:flex-row">
                            <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                <img src={user?.photo} alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-md object-cover mx-auto mb-2" />
                                <ImageUploading value={image} onChange={handleImageChange} acceptType={['jpg', 'jpeg', 'png']} maxNumber={1}>
                                    {({ onImageUpload }) => (
                                        <button type="button" onClick={onImageUpload} className="ml-4 btn btn-primary">
                                            {Ischanging ? 'Changing' : 'Change Profile Picture'}
                                        </button>
                                    )}
                                </ImageUploading>
                            </div>
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="fullName"
                                        value={updateAdminInfoInput.fullName}
                                        onChange={handleUpdateAdminInfoInputChange}
                                        placeholder={user?.fullName}
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address">Address</label>
                                    <input
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={updateAdminInfoInput.address}
                                        onChange={handleUpdateAdminInfoInputChange}
                                        placeholder={user?.address}
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        value={updateAdminInfoInput.phone}
                                        onChange={handleUpdateAdminInfoInputChange}
                                        placeholder={user?.phone}
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="age">Age</label>
                                    <input
                                        id="age"
                                        type="text"
                                        name="age"
                                        value={updateAdminInfoInput.age}
                                        onChange={handleUpdateAdminInfoInputChange}
                                        placeholder={user?.age.toString()}
                                        className="form-input"
                                    />
                                </div>

                                <div className="sm:col-span-2 mt-3">
                                    <button type="submit" className="btn btn-primary">
                                        {UAisLoading ? 'Proceeding...' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                ''
            )}
            {tabs === 'security' ? (
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-5">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-semibold text-lg mb-4">Change Password</h5>
                            </div>
                            <div className="mb-5">
                                <form onSubmit={handleUpdatePassword}>
                                    <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="currentPassword">Current password</label>
                                            <div className="relative text-white-dark">
                                                <input
                                                    id="currentPassword"
                                                    name="currentPassword"
                                                    value={updatePasswordInput.currentPassword}
                                                    type={passwordVisibility.current ? 'text' : 'password'}
                                                    onChange={handleUpdatePasswordChange}
                                                    placeholder="Current password"
                                                    className="form-input"
                                                />
                                                <span onClick={() => togglePasswordVisibility('current')} className="absolute end-4 right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                                    <IconEye fill={true} />
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="newPassword">New password</label>
                                            <div className="relative text-white-dark">
                                                <input
                                                    id="newPassword"
                                                    name="newPassword"
                                                    type={passwordVisibility.new ? 'text' : 'password'}
                                                    value={updatePasswordInput.newPassword}
                                                    onChange={handleUpdatePasswordChange}
                                                    placeholder="Enter password"
                                                    className="form-input"
                                                />
                                                <span onClick={() => togglePasswordVisibility('new')} className="absolute end-4 right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                                    <IconEye fill={true} />
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword">Confirm password</label>
                                            <div className="relative text-white-dark">
                                                <input
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type={passwordVisibility.confirm ? 'text' : 'password'}
                                                    placeholder="Confirm password"
                                                    value={updatePasswordInput.confirmPassword}
                                                    onChange={handleUpdatePasswordChange}
                                                    className="form-input"
                                                />
                                                <span onClick={() => togglePasswordVisibility('confirm')} className="absolute end-4 right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                                    <IconEye fill={true} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary mt-5">
                                        {Uisloading ? 'Proceding...' : 'Save'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default CustProfile
