import { updateDoc, increment } from 'firebase/firestore';
import { ref } from '../../firebase/config'

export default async function handler(req, res) {
    await updateDoc(ref, {count: increment(1)})
    res.status(200).json({ status: 'ok' });
}
