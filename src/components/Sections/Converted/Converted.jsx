import { Flex, Grid, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { memo, useCallback, useEffect, useState } from 'react'
import Card4 from '../../Cards/Card4'
import { getCommonApi } from '../../../services/ApiCalls'
import LoderAnimation from '../../Loader/LoderAnimation'
import NoData from '../../NoData/NoData'

const Converted = () => {
    const [isLoading, setisLoading] = useState(true)
    const [convertedLeads, setconvertedLeads] = useState([])
    const [seasonalLeads, setseasonalLeads] = useState([])
    const [regularLeads, setregularLeads] = useState([])
    const [leadsToShow, setleadsToShow] = useState([]) // state to store currently selected leads

    const getLeads = useCallback(async () => {
        try {
            setisLoading(true)
            const res = await getCommonApi('/leadapi/getconvertedLeads')
            if (res?.success) {
                setconvertedLeads(res?.leads?.allConvertedLeads)
                setseasonalLeads(res?.leads?.seasonalLeads)
                setregularLeads(res?.leads?.regularLeads)
                setleadsToShow(res?.leads?.allConvertedLeads) // default to all leads
            }
        } catch (error) {
            console.error(error);
        } finally {
            setisLoading(false)
        }
    }, [])

    useEffect(() => {
        getLeads()
    }, [])

    return (
        <>
            {isLoading ? (
                <LoderAnimation />
            ) : (
                <>
                    <Tabs>
                        <TabList>
                            <Tab onClick={() => setleadsToShow(convertedLeads)}>All</Tab>
                            <Tab onClick={() => setleadsToShow(seasonalLeads)}>Seasonal</Tab>
                            <Tab onClick={() => setleadsToShow(regularLeads)}>Regular</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <CardSection list={leadsToShow} /*text="Converted Leads"*/ />
                            </TabPanel>
                            <TabPanel>
                                <CardSection list={leadsToShow} /*text="Seasonal Leads"*/ />
                            </TabPanel>
                            <TabPanel>
                                <CardSection list={leadsToShow} /*text="Regular Leads"*/ />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </>
            )}
        </>
    )
}

export default memo(Converted)

const CardSection = ({ list = [], text = '' }) => {
    return (
        <Flex flexDir={'column'} gap={'0.5rem'}>
            <Text fontWeight={600}>{text}</Text>
            {list?.length > 0 ? (
                <Grid templateColumns={'repeat(1,1fr)'} gap={'0.5rem'}>
                    {list?.map((item, index) => {
                        return <Card4 {...item} key={index} />
                    })}
                </Grid>
            ) : (
                <NoData />
            )}
        </Flex>
    )
}
