import {setModal} from '@state/actions'
import {Modals, UIZones} from '@root/properties'

export const toggleModalCardDetails = (open: boolean) => setModal({
   id: Modals.CardDetails,
   uiZone: UIZones.ModalCardDetails,
   open
})

export const toggleModalPath = (open: boolean) => setModal({
   id: Modals.Path,
   uiZone: UIZones.ModalPath,
   open
})

export const toggleModalMentor = (open: boolean) => setModal({
   id: Modals.Mentor,
   uiZone: UIZones.ModalMentor,
   open
})