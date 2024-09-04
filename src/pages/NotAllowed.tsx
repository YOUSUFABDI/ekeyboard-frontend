import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IRootState } from '../store'
import { setPageTitle } from '../store/themeConfigSlice'

const NotAllowed = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle('Error 404'))
    })
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode)

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20">
                <div className="relative">
                    <p className="mt-5 text-base dark:text-white">Your are not authorized to this page</p>
                    <button
                        onClick={() => {
                            localStorage.clear()
                            navigate('/login')
                        }}
                        className="btn bg-primary text-white  mx-auto !mt-7 w-max border-0 uppercase  shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotAllowed
