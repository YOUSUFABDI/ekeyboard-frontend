import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import IconX from '../../components/Icon/IconX'

interface EditUserModalDT {
    userModal: boolean
    setUserModal: (value: boolean) => void
}

const EditUserModal = ({ userModal, setUserModal }: EditUserModalDT) => {
    return (
        <div className="mb-5">
            <Transition appear show={userModal} as={Fragment}>
                <Dialog as="div" open={userModal} onClose={() => setUserModal(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <h5 className="font-bold text-lg">Edit Profile</h5>
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => setUserModal(false)}>
                                            <IconX className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <form className="space-y-5">
                                            <div>
                                                <label htmlFor="ctnEmail">Email address</label>
                                                <input id="ctnEmail" type="email" placeholder="name@example.com" className="form-input" required />
                                            </div>

                                            <button type="submit" className="btn btn-primary !mt-6">
                                                Submit
                                            </button>
                                        </form>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setUserModal(false)}>
                                                Discard
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setUserModal(false)}>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default EditUserModal
