import { DriveFolderUploadOutlined } from "@mui/icons-material"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MainLayout from "../../components/layout/MainLayout"
import { db, storage } from "../../firebase"
import "./newProduct.scss"
const NewProduct = ({ inputs }) => {
  const [file, setFile] = useState("")
  const [data, setData] = useState({})
  const [percent, setPercent] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name
      const storageRef = ref(storage, `products/${name}`)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("Upload is " + progress + "% done")
          setPercent(progress)
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused")
              break
            case "running":
              console.log("Upload is running")
              break
            default:
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }))
          })
        }
      )
    }
    file && uploadFile()
  }, [file])

  const handleInput = (e) => {
    const id = e.target.id
    const value = e.target.value

    setData({ ...data, [id]: value })
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "products"), {
        ...data,
        status: "active",
        timestamp: serverTimestamp(),
      })
      navigate(-1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MainLayout>
      <div className="new">
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="product">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="product"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label htmlFor="">{input.label}</label>
                  <input
                    type={input.type}
                    id={input.id}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}

              <select
                id="category"
                style={{ width: "40%", height: "2.2rem", alignSelf: "center" }}
                onChange={handleInput}
                name="category"
                defaultValue="category"
              >
                <option value="category" disabled>
                  --Select a Category--
                </option>
                <option value="formal" id="formal">
                  Formal
                </option>
                <option value="casual" id="casual">
                  Casual
                </option>
                <option value="party" id="party">
                  Party
                </option>
                <option value="shoes" id="shoes">
                  Shoes
                </option>
              </select>
              <select
                id="size"
                style={{
                  width: "40%",
                  height: "2.2rem",
                  alignSelf: "center",
                }}
                onChange={handleInput}
                name="sizes"
                defaultValue="sizes"
              >
                <option value="sizes" disabled>
                  --Select a Size--
                </option>
                <option value="xxl" id="xxl">
                  XXL
                </option>
                <option value="xl" id="xl">
                  XL
                </option>
                <option value="l" id="l">
                  L
                </option>
                <option value="m " id="m">
                  M
                </option>
                <option value="s" id="s">
                  S
                </option>
                <option value="xs" id="xs">
                  XS
                </option>
              </select>

              <button
                type="submit"
                disabled={percent !== null && percent < 100}
              >
                ADD PRODUCT
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default NewProduct
