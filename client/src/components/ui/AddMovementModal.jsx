import { useState, useEffect } from "react"
import styles from "./AddMovementModal.module.css"
import api from "../../api/api"
import { IoClose } from "react-icons/io5"
import { FaSave } from "react-icons/fa"

function AddMovementModal({ cartridge, closeModal, refreshCartridges }) {
  const [formData, setFormData] = useState({
    cartridge_id: "",
    action_type: "Выдача",
    to_location: "",
    quantity: 1,
    comment: "",
  })
  const [cartridgesList, setCartridgesList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCartridges = async () => {
      try {
        const response = await api.get("/cartridges")
        setCartridgesList(response.data)

        if (response.data.length > 0) {
          const initialId = cartridge?.id || response.data[0].id
          setFormData((prev) => ({ ...prev, cartridge_id: initialId }))
        }
      } catch (error) {
        console.error("Ошибка загрузки картриджей:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCartridges()
  }, [cartridge?.id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.cartridge_id) {
      alert("Выберите картридж")
      return
    }
    try {
      await api.post("/movements", formData)
      if (refreshCartridges) refreshCartridges()
      closeModal()
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Ошибка при создании операции")
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Новая операция</h2>
          <button className={styles.modalClose} onClick={closeModal}>
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Тип операции</label>
              <select name="action_type" onChange={handleChange}>
                <option>Выдача</option>
                <option>Поступление</option>
                <option>Заправка</option>
                <option>Списание</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Картридж *</label>
              <select name="cartridge_id" value={formData.cartridge_id} onChange={handleChange} disabled={loading}>
                {loading ? (
                  <option>Загрузка...</option>
                ) : (
                  cartridgesList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.model} ({c.qty} шт.)
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Количество *</label>
              <input type="number" name="quantity" placeholder="Количество" min="0" onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Принтер / отдел</label>
              <input type="text" name="to_location" placeholder="Бухгалтерия" onChange={handleChange} />
            </div>
            <div className={`${styles.formGroup} ${styles.full}`}>
              <label>Примечание</label>
              <textarea name="comment" placeholder="Дополнительная информация..." onChange={handleChange} />
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelBtn} onClick={closeModal}>
              Отмена
            </button>
            <button type="submit" className={styles.saveBtn}>
              <FaSave />
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMovementModal
