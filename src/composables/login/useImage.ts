import { ref, onMounted } from 'vue'
import { getImagApi } from '@/api/user/user';
export function useImage() {
  const imgSrc = ref('')
  const getImage = () => {
    getImagApi().then(res => {
      return 'data:image/png;base64,' + btoa(
        new Uint8Array(res.data as any).reduce((data, byte) => data + String.fromCharCode(byte), '')
      )
    }).then(data => {
      imgSrc.value = data
    })
  }
  onMounted(() => {
    getImage()
  })
  return { imgSrc, getImage }
}