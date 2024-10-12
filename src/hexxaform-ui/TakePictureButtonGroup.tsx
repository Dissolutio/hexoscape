import { Button, ButtonGroup } from '@mui/material'
import { MdCameraFront } from 'react-icons/md'

const TakePictureButtonGroup = () => {
  const handleTakePicture = (e) => {
    console.log('🚀 ~ handleTakePicture ~ e:', e)
  }
  return (
    <ButtonGroup
      sx={{ padding: '10px' }}
      variant="contained"
      orientation="vertical"
      size={'small'}
      aria-label="Save current camera view as an image file"
    >
      <Button
        startIcon={<MdCameraFront />}
        onClick={handleTakePicture}
        variant="contained"
      >
        Take a picture
      </Button>
    </ButtonGroup>
  )
}
export default TakePictureButtonGroup
