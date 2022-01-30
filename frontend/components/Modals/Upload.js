import {Modal, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dropzone from '../../lib/upload';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "min(100%, 600px)",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

const UploadModal = ({handleClose}) => {
    return <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography variant={"h3"} textAlign={"center"}>Upload</Typography>
            <Stack spacing={2} mt={4}>
                <TextField variant={"outlined"} label={"Class Name"} placeholder={"(e.g. \"CSCI 4325\")"}
                           fullWidth={true}
                />
                <TextField variant={"outlined"} label={"Lecture Name"} placeholder={"(e.g. \"Creation of Programs\")"}
                           fullWidth={true}
                />
                <Dropzone onFileAccepted={console.log}/>
                <Button fullWidth variant={"contained"} onClick={() => console.log("submitted")}>Start Processing</Button>
            </Stack>
        </Box>
    </Modal>
}
export default UploadModal
