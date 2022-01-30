import {Button, Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";

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

const LoginButton = ({sx = {}, ...props}) => (<Button
    color={"secondary"}
    fullWidth

    sx={{
        color: "inherit", "& > span": {marginLeft: "8px"}, ...sx
    }}
    type={"button"}
    variant={"outlined"}
    {...props}
/>);

const LoginModal = ({handleClose, isLogin}) => {
    const router = useRouter();

    return <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography mb={4} variant={"h3"} textAlign={"center"}>{isLogin ? "Login" : "Signup"}</Typography>
            <LoginButton onClick={() => signIn("google")}>
                <img alt={""} src={"/img/google.png"} width={20} height={20}/>
                <span>Continue with Google</span>
            </LoginButton>

            <LoginButton onClick={() => signIn("discord")} sx={{mt: 2}}>
                <img alt={""} src={"/img/discord.svg"} width={23} height={18}/>
                <span>Continue with Discord</span>
            </LoginButton>

        </Box>
    </Modal>
}
export default LoginModal
