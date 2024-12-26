import { Button, Flex, Text ,Image} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { FaDownload } from 'react-icons/fa'
import { postCommonApi } from '../../services/ApiCalls'
import { getSessionUserID } from '../../services/formatter'
import { saveAs } from 'file-saver'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import quality_diffrence_CLASSIC_PREMIUM from '../../assets/pdfs/CLASSIC & PREMIUM Quality diffrence.pdf'
import weddingpackagesPDF from '../../assets/pdfs/WEDDING PACKAGES.pdf'
// Import PDF Viewer Libraries
import { Worker, Viewer } from '@react-pdf-viewer/core'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const InventoryPage = () => {
    const [pdfFiles, setPdfFiles] = useState([]) // Store PDFs with key and name
    const [activePdf, setActivePdf] = useState(null) // Track which PDF is being viewed
    useEffect(() => {
        setPdfFiles([
            { key: weddingpackagesPDF, name: 'WEDDING PACKAGES' },
            { key: quality_diffrence_CLASSIC_PREMIUM, name: 'CLASSIC & PREMIUM Quality diffrence' },
        ])
    }, [])
    // Fetch PDFs
    // const getLeads = useCallback(async () => {
    //     try {
    //         let payload = { UserId: getSessionUserID() }
    //         const res = await postCommonApi(`/adminapi/getUserData`, payload)
    //         if (res?.success) {
    //             setPdfFiles([
    //                 { key: sample1, name: 'Sample Document 1' },
    //                 { key: '/pdfs/sample2.pdf', name: 'Sample Document 2' },
    //             ])
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }, [])

    // useEffect(() => {
    //     getLeads()
    // }, [])

    const handleDownload = (fileUrl, fileName) => {
        saveAs(fileUrl, fileName)
    }

    return (
        <Flex bg={'var(--blue-color)'} h={'100vh'} flexDir={'column'} pos={'relative'}>
        <Image src='/images/bg-design1.png' pos={'fixed'} width={'50%'} top={'-4rem'} right={'-7rem'} zIndex={1} />
        <>
        <Flex minH={'8vh'} px={'1rem'} gap={'1rem'} alignItems={'center'} justify={'space-between'}>
        <Link to={'/dashboard'}>
                    <Flex gap={'0.8rem'} color={'white'}>
                        <IoIosArrowBack fontSize={'1.5rem'} />
                        <Text>Home</Text>
                    </Flex>
                </Link>
            <Image src='/images/image-top.png' h={'2rem'} />
        </Flex>
        <Flex flexDir="column" p="1rem" bg="white">
<Text fontSize="1.2rem" fontWeight="bold" mb="1rem">
    Documents
</Text>

{pdfFiles.map((file, index) => (
    <Flex
        key={index}
        mt="1rem"
        p="1rem"
        border="1px solid #e0e0e0"
        borderRadius="5px"
        flexDir="column"
    >
        {/* PDF Title */}
        <Text mb="1rem" fontWeight="600">
            {file.name}
        </Text>

        {/* Buttons for Viewing and Downloading PDFs */}
        <Flex gap="1rem" mb="1rem">
            <Button
                colorScheme="blue"
                size="sm"
                onClick={() => setActivePdf(file.key)} // Set active PDF
            >
                View
            </Button>

            <Button
                colorScheme="green"
                size="sm"
                onClick={() => handleDownload(file.key, file.name)}
                leftIcon={<FaDownload />}
            >
                Download
            </Button>
        </Flex>

        {/* Conditionally Render the PDF Viewer */}
        {activePdf === file.key && (
            <Flex flexDir="column" mt="1rem" border="1px solid #e0e0e0" borderRadius="5px">
                {/* Close Button */}
                <Flex justifyContent="flex-end" p="0.5rem" bg="gray.100">
                    <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => setActivePdf(null)} // Reset active PDF
                    >
                        Close
                    </Button>
                </Flex>

                {/* PDF Viewer */}
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <div style={{ height: '400px', border: '1px solid #e0e0e0', borderTop: 'none' }}>
                        <Viewer fileUrl={file.key} />
                    </div>
                </Worker>
            </Flex>
        )}
    </Flex>
))}
</Flex>
        </>

    </Flex>
    )
}

export default InventoryPage
