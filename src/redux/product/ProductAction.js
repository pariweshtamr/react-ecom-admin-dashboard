import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import {
  getProductsSuccess,
  getSingleProductSuccess,
  requestFail,
  requestPending,
} from "./ProductSlice"

export const fetchAllProducts = () => async (dispatch) => {
  dispatch(requestPending())
  let prods = []
  try {
    const querySnapshot = await getDocs(collection(db, "products"))
    querySnapshot.forEach((doc) => {
      prods.push({ id: doc.id, ...doc.data() })
    })

    dispatch(getProductsSuccess(prods))
  } catch (error) {
    dispatch(requestFail(error))
    console.log(error)
  }
}

export const fetchSingleProduct = (productId) => async (dispatch) => {
  dispatch(requestPending())
  try {
    const docRef = doc(db, "products", productId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      dispatch(getSingleProductSuccess(docSnap.data()))
    } else {
      console.log("No such document")
    }
  } catch (err) {
    console.log(err)
  }
}

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "products", productId))
  } catch (error) {
    console.log(error)
  }
}
