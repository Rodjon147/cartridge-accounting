import { useState } from "react"
import api from "../../api/api"

function EditCartridgeModal({cartridge, closeModal, refreshCartridges}) {

    const [formData, setFormData] = useState({
        model: cartridge.model,
        type: cartridge.type,
        printer: cartridge.printer,
        qty: cartridge.qty,
        min_qty: cartridge.min_qty,
        refill_date: cartridge.refill_date ? cartridge.refill_date.split("T")[0]: "",
        note: cartridge.note || ""
    })


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await api.put(`/cartridges/${cartridge.id}`, formData)
            refreshCartridges()
            closeModal()

        } catch (error) {

            console.error(error)

        }
    }


    return (
        <div className="modal-overlay">

            <div className="modal">

                <h2>Редактировать картридж</h2>

                <form onSubmit={handleSubmit}>

                    <input type="text" name="model" value={formData.model} onChange={handleChange}/>
                    <input type="text" name="type" value={formData.type} onChange={handleChange}/>
                    <input type="text" name="printer" value={formData.printer} onChange={handleChange}/>
                    <input type="number" name="qty" value={formData.qty} onChange={handleChange}/>
                    <input type="number" name="min_qty" value={formData.min_qty} onChange={handleChange}/>
                    <textarea name="note" value={formData.note} onChange={handleChange}/>
                    <div className="modal-actions">

                        <button type="submit" className="save-btn">Сохранить</button>
                        <button type="button" className="cancel-btn" onClick={closeModal}>Отмена</button>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default EditCartridgeModal