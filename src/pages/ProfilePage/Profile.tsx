import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import IconCalendar from '../../components/Icon/IconCalendar'
import IconCoffee from '../../components/Icon/IconCoffee'
import IconMail from '../../components/Icon/IconMail'
import IconMapPin from '../../components/Icon/IconMapPin'
import IconPencilPaper from '../../components/Icon/IconPencilPaper'
import IconPhone from '../../components/Icon/IconPhone'
import { ApiErrorResponseDT, ApiSuccessResponseDT, UserDT } from '../../lib/types'
import { IRootState } from '../../store'
import { useGetAuthenticatedUserQuery } from '../../store/auth/authApi'
import { setPageTitle } from '../../store/themeConfigSlice'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const Profile = () => {
    const [user, setUser] = useState<UserDT | null>(null)

    const { data, isLoading, isError, error } = useGetAuthenticatedUserQuery()

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
        dispatch(setPageTitle('Profile'))
    })

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Profile</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                    <div className="panel ">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
                            <Link to="/dash-users/user-account-settings" className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
                                <IconPencilPaper />
                            </Link>
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-col justify-center items-center">
                                {isLoading ? (
                                    <span className="flex justify-center items-center w-24 h-24 text-center rounded-full object-cover bg-success text-base text-white">IMG</span>
                                ) : (
                                    <img src={user?.photo} alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" />
                                )}
                                <p className="font-semibold text-primary text-xl capitalize">{user?.username}</p>
                            </div>
                            <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                <li className="flex items-center gap-2">
                                    <IconCoffee className="shrink-0" />
                                    {user?.role}
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconCalendar className="shrink-0" />
                                    Jan 20, 1989
                                </li>
                                <li className="flex items-center gap-2 capitalize">
                                    <IconMapPin className="shrink-0" />
                                    {user?.address}
                                </li>
                                <li>
                                    <button className="flex items-center gap-2">
                                        <IconMail className="w-5 h-5 shrink-0" />
                                        <span className="text-primary truncate">{user?.email}</span>
                                    </button>
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconPhone />
                                    <span className="whitespace-nowrap" dir="ltr">
                                        {user?.phone}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
