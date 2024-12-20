import i18next from 'i18next'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ApiErrorResponseDT } from '../../lib/types'
import { IRootState } from '../../store'
import { useLoginMutation } from '../../store/auth/authApi'
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice'
import Dropdown from '../Dropdown'
import IconCaretDown from '../Icon/IconCaretDown'
import IconEye from '../Icon/IconEye'
import IconLockDots from '../Icon/IconLockDots'
import IconMail from '../Icon/IconMail'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const Login = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [inputValue, setInputValue] = useState({
        username: '',
        password: '',
    })

    const [login, { data, isError, isLoading, error }] = useLoginMutation()

    const navigate = useNavigate()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setInputValue({ ...inputValue, [name]: value })
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle('Login'))

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

        if (data?.payload?.data?.token) {
            const { token, role } = data.payload.data
            localStorage.setItem('token', token)
            localStorage.setItem('role', role)

            navigate(role === 'admin' ? '/dashboard' : '/')
            window.location.reload()
        }
    }, [data, error, isError, navigate, dispatch])

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false
    const themeConfig = useSelector((state: IRootState) => state.themeConfig)
    const setLocale = (flag: string) => {
        setFlag(flag)
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'))
        } else {
            dispatch(toggleRTL('ltr'))
        }
    }
    const [flag, setFlag] = useState(themeConfig.locale)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    const handleLogin = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const { username, password } = inputValue
            await login({ username, password }).unwrap()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="relative flex min-h-screen items-center justify-center  bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-primary p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <div className=" hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/auth/login.svg" alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link to="/" className="w-8 block lg:hidden">
                                <img src="/favicon.png" alt="Logo" className="mx-auto w-10" />
                            </Link>
                            <div className="dropdown ms-auto w-max">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                    button={
                                        <>
                                            <div>
                                                <img src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
                                            </div>
                                            <div className="text-base font-bold uppercase">{flag}</div>
                                            <span className="shrink-0">
                                                <IconCaretDown />
                                            </span>
                                        </>
                                    }
                                >
                                    <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                        {themeConfig.languageList.map((item: any) => {
                                            return (
                                                <li key={item.code}>
                                                    <button
                                                        type="button"
                                                        className={`flex w-full hover:text-primary rounded-lg ${flag === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                        onClick={() => {
                                                            i18next.changeLanguage(item.code)
                                                            setLocale(item.code)
                                                        }}
                                                    >
                                                        <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                                                        <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your username and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            name="username"
                                            value={inputValue.username}
                                            onChange={handleInputChange}
                                            id="Email"
                                            type="text"
                                            placeholder="Enter Username"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            name="password"
                                            value={inputValue.password}
                                            onChange={handleInputChange}
                                            id="Password"
                                            type={isShowPassword ? 'text' : 'password'}
                                            placeholder="Enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                        <span onClick={toggleShowPassword} className="absolute end-4 right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                            <IconEye fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end">
                                    <Link to="/forgot-password" className="hover:text-danger">
                                        <span>Forgot password?</span>
                                    </Link>
                                </div>
                                <button type="submit" disabled={isLoading} className="btn bg-primary text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    {isLoading ? 'Proceeding...' : 'Sign in'}
                                </button>
                                <div className="flex items-center justify-end">
                                    <Link to="/sign-up" className="hover:text-primary">
                                        <span>Don't have account? signup</span>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
