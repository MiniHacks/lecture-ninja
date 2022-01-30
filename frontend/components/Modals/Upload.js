import {Modal, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dropzone from '../../lib/upload';
import {useCallback, useState} from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";

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
    const [file, setFile] = useState()
    const [className, setClassName] = useState("");
    const [lectureName, setLectureName] = useState("");
    const router = useRouter();
    const {data: session} = useSession();

    const startProcessing = useCallback(() => {
        const data = new FormData()
        data.append('class', className);
        data.append('email', session.user.email);
        data.append('lecture', lectureName)
        data.append('video', file)

        fetch(process.env.NEXT_PUBLIC_BACKEND + '/upload', {
            method: 'POST', body: data
        }).then(r => r.json()).then((r) => {
            console.log(r);
            router.push("/dashboard").then(() => router.reload())
        })
    }, [className, lectureName, file])
    return <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography variant={"h3"} textAlign={"center"}>Upload</Typography>
            <Stack spacing={2} mt={4}>
                <TextField autoFocus={true} variant={"outlined"} label={"Class Name"} placeholder={"(e.g. \"CSCI 4325\")"}
                           fullWidth={true} value={className} onChange={e => setClassName(e.currentTarget.value)}
                />
                <TextField variant={"outlined"} label={"Lecture Name"} placeholder={"(e.g. \"Creation of Programs\")"}
                           fullWidth={true} value={lectureName} onChange={e => setLectureName(e.currentTarget.value)}
                />
                <Dropzone onFileAccepted={setFile}/>
                <Button fullWidth variant={"contained"} onClick={() => startProcessing()}>Start
                    Processing</Button>
            </Stack>
        </Box>
    </Modal>
}
export default UploadModal
