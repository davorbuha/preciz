import { Button, Dialog, makeStyles } from '@material-ui/core'
import React from 'react'

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onImageCapture: () => void
}

function CameraPreview(props: Props){
    const classes = useStyles()
    return  <Dialog open={props.isOpen} PaperProps={{style: {maxWidth: '2000px' , backgroundColor: 'transparent'}}} onBackdropClick={props.onClose}>
    <div style={{width:1280, height: 680, backgroundColor: 'red'}}></div>
    {/* <canvas id="camera" width="1280" height="680"/> */}
    <div className={classes.buttonWrapper}>
    <Button
      onClick={props.onClose}
      variant="contained"
      color="primary"
    >
     Izađi
    </Button>
    <Button
      onClick={props.onImageCapture}
      variant="contained"
      color="primary"
    >
      Uslikaj 
    </Button>
    
    </div>
  </Dialog>
}

const useStyles = makeStyles(() => ({
    buttonWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
      } 
}))

export default CameraPreview