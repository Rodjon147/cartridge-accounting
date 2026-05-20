import { useState } from 'react'
import api from "../../api/api"
import styles from "./AddCartridgeModal.module.css"
import { IoClose } from "react-icons/io5"
import { FaSave } from "react-icons/fa"

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
        <div className={styles.modalHeader}>
          <h2>Добавить картридж</h2>
          <button className={styles.modalClose} onClick={closeModal}>
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Модель картриджа *</label>
            <input type="text" name="model" placeholder="Модель" onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Тип</label>
            <select onChange={handleChange}>
              <option value="Лазерный">Лазерный</option>
              <option value="Струйный">Струйный</option>
              <option value="Матричный">Матричный</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Принтер</label>
            <input type="text" name="printer" placeholder="Принтер" onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Количество *</label>
            <input type="number" name="qty" placeholder="Количество" min="0" onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Мин. остаток (предупреждение)</label>
            <input type="number" name="min_qty" placeholder="2" min="0" onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Дата последней заправки</label>
            <input type="date" name="refill_date" onChange={handleChange} />
          </div>

          <div className={`${styles.formGroup} ${styles.full}`}>
            <label>Примечание</label>
            <textarea name="note" placeholder="Дополнительная информация..." onChange={handleChange} />
          </div>
        </form>
        <div className={styles.modalActions}>
          <button type="button" className={styles.cancelBtn} onClick={closeModal}>
            Отмена
          </button>
          <button type="submit" className={styles.saveBtn}>
            <FaSave />
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCartridgeModal
