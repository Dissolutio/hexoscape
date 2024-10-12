import { Box } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import html2canvas from 'html2canvas'

const TakeAPictureBox = () => {
  const { gl, scene, camera } = useThree()
  const handleDownloadImage = () => {
    gl.render(scene, camera)
    const screenshot = gl.domElement.toDataURL()
    const link = document.createElement('a')
    link.download = `image.png`
    link.href = screenshot
    // document.body.appendChild(link)
    link.click()
    // document.body.removeChild(link)
  }

  return <Box onClick={handleDownloadImage} args={[3, 3, 3]} />
}

export default TakeAPictureBox
