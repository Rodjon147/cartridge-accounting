import { useState } from 'react'
import api from "../../api/api"
import styles from "./AddCartridgeModal.module.css"

function AddCartridgeModal({ closeModal, refreshCartridges }) {
    const [formData, setFormData] = useState({
        model: "",
        type: "",
        printer: "",
        qty: 0,
        min_qty: 0,
        refill_date: "",
        note: ""
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            await api.post("/cartridges", formData)
            refreshCartridges()
            closeModal()
        }catch (error){
            console.error(error)
        }
    }
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Добавить картридж</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="model" placeholder="Модель" onChange={handleChange} required />

          <input type="text" name="type" placeholder="Тип" onChange={handleChange} />

          <input type="text" name="printer" placeholder="Принтер" onChange={handleChange} />

          <input type="number" name="qty" placeholder="Количество" onChange={handleChange} />

          <input type="number" name="min_qty" placeholder="Минимальное количество" onChange={handleChange} />

          <input type="date" name="refill_date" onChange={handleChange} />

          <textarea name="note" placeholder="Заметка" onChange={handleChange} />

          <div className={styles.modalActions}>
            <button type="submit" className={styles.saveBtn}>
              Сохранить
            </button>

            <button type="button" className={styles.cancelBtn} onClick={closeModal}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCartridgeModal
