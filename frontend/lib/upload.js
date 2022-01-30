import {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Box} from '@chakra-ui/react';

export default function Dropzone({onFileAccepted}) {
    const [file, setFile] = useState(null);
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
        setFile(acceptedFiles[0].name)
        onFileAccepted(acceptedFiles[0]);
    }, [onFileAccepted]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop, maxFiles: 1, multiple: false,
    });

    const dropText = isDragActive ? 'Drop the files here ...' : 'Drag \'n\' drop your file here, or click to select files';

    const activeBg = 'gray.600'
    const borderColor = 'rgba(255,255,255,0.2)';


    return (<Box
        p={10}
        cursor="pointer"
        bg={isDragActive ? activeBg : 'transparent'}
        _hover={{bg: activeBg}}
        transition="background-color 0.2s ease"
        borderRadius={4}
        color={'rgba(255,255,255,0.7)'}
        border="3px dashed"
        borderColor={borderColor}
        {...getRootProps()}
    >
        <input {...getInputProps()} />
        <p>{file ?? dropText}</p>
    </Box>);
}
