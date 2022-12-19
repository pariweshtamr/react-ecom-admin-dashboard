import { DriveFolderUploadOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"

import "./newUser.scss"
import { auth, db, storage } from "../../firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useNavigate } from "react-router-dom"

const NewUser = ({ inputs }) => {
  const [file, setFile] = useState("")
  const [data, setData] = useState({})
  const [percent, setPercent] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name
      const storageRef = ref(storage, `users/${name}`)

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
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      })
      navigate(-1)
    } catch (error) {
      console.log(error)
      if (error.message.includes("EMAIL_EXISTS")) {
      }
    }
  }

  return (
    <MainLayout>
      <div className="new">
        <div className="top">
          <h1>Add New User</h1>
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
                <label htmlFor="profile">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="profile"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label htmlFor="">{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <select
                id="role"
                style={{ width: "40%", height: "2.2rem", alignSelf: "center" }}
                onChange={handleInput}
              >
                <option value="" disabled>
                  --Select a role--
                </option>
                <option value="admin" id="admin">
                  Admin
                </option>
                <option value="user" id="user">
                  User
                </option>
              </select>

              <button
                type="submit"
                disabled={percent !== null && percent < 100}
              >
                ADD USER
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default NewUser
