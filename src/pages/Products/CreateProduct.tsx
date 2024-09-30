import { useEffect, useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { setPageTitle } from '../../store/themeConfigSlice'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const CreateProduct = () => {
    const [images, setImages] = useState<any>([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('Products'))
    }, [])

    const maxNumber = 69

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[])
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Products
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Create</span>
                </li>
            </ul>

            <div className="pt-5">
                <div className="panel px-5 border-white-light dark:border-[#1b2e4b]">
                    <form>
                        <div className="grid lg:grid-cols-2 gap-5">
                            <div className="mb-5">
                                <label htmlFor="ctnName">Product name</label>
                                <input id="ctnName" type="text" placeholder="Product name" className="form-input" required />
                            </div>

                            <div className="mb-5">
                                <div>
                                    <label htmlFor="ctnDescription">Product description</label>
                                    <input id="ctnDescription" type="text" placeholder="Product description" className="form-input" required />
                                </div>
                            </div>

                            <div className="mb-5">
                                <div>
                                    <label htmlFor="ctnPrice">Product price</label>
                                    <input id="ctnPrice" type="number" placeholder="Product price" className="form-input" required />
                                </div>
                            </div>

                            <div className="mb-5">
                                <div>
                                    <label htmlFor="ctnStock">Product stock</label>
                                    <input id="ctnStock" type="number" placeholder="Product stock" className="form-input" required />
                                </div>
                            </div>
                            <div className="custom-file-container" data-upload-id="myFirstImage">
                                <div className="label-container">
                                    <label>Upload </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setImages([])
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} multiple dataURLKey="dataURL" acceptType={['jpg', 'jpeg', 'png']}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <button
                                                className="custom-file-container__custom-file__custom-file-control"
                                                onClick={onImageUpload}
                                                style={isDragging ? { color: 'red' } : undefined}
                                                {...dragProps}
                                            >
                                                Choose Files...
                                            </button>
                                            &nbsp;
                                            <div className="flex">
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="custom-file-container__image-preview relative ">
                                                        <img src={image.dataURL} alt="img" className="m-auto mt-10" />
                                                        <button type="button" className="" onClick={() => onImageRemove(index)}>
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                                {images.length === 0 ? <img src="/assets/images/file-preview.svg" className="max-w-md w-full m-auto mt-10" alt="" /> : ''}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct
