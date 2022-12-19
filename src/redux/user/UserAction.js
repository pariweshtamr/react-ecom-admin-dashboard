import {
  getSingleUserSuccess,
  getUsersSuccess,
  requestFail,
  requestPending,
} from "./UserSlice"
import { db } from "../../firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"

export const fetchAllUsers = () => async (dispatch) => {
  dispatch(requestPending())
  let list = []
  try {
    const querySnapshot = await getDocs(collection(db, "users"))
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() })
    })
    dispatch(getUsersSuccess(list))
  } catch (error) {
    dispatch(requestFail(error))
    console.log(error)
  }
}

export const fetchSingleUser = (userId) => async (dispatch) => {
  dispatch(requestPending())
  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      dispatch(getSingleUserSuccess(docSnap.data()))
    } else {
      console.log("No such document")
    }
  } catch (err) {
    console.log(err)
  }
}
