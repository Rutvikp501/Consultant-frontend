import { Button, Flex, Grid, Image, Input, Select, Text, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import Card1 from '../../components/Cards/Card1'
import { FaPlus } from 'react-icons/fa'
import { dummyLeadsCall, postCommonApi } from '../../services/ApiCalls'
import LoderAnimation from '../../components/Loader/LoderAnimation'
import InputWrapper from '../../components/InputWrapper'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { datePickerDate, getSessionUserID, toastFormatter } from '../../services/formatter'
import Flatpickr from "react-flatpickr";
import '../../assets/css/material_blue.css'
import DatePickerWrapper from '../../components/DatePickerWrapper'

const AddEvent = () => {
    const { state } = useLocation();
    const userID = getSessionUserID();
    const toast = useToast();
    const navigate = useNavigate();
    const initialData = { eventSpecialsName: '', specialCode: '', leadType: 'Regular', consultant: userID };
    const [isLoading, setisLoading] = useState(false);
    const [leads, setleads] = useState(initialData);
    const packageinitialData = { name: '', amount: '' };
    const [packages, setpackages] = useState(packageinitialData);
    const [eventDetails, seteventDetails] = useState({
        name: '',
        location: '',
        date: '',
        timing: ''
    });
    const [toDate, settoDate] = useState(null);
    const [packageOptions, setPackageOptions] = useState([]);

    const handleToDateChange = (date) => {
        let dateFormatted = datePickerDate(date);
        seteventDetails({ ...eventDetails, date: dateFormatted });
        settoDate(date[0]);
    };

    const goToEvents = async () => {
        const { eventSpecialsName } = leads;
        const { name, location, date, timing } = eventDetails;
        if (eventSpecialsName === '' || name === '' || location === '' || date === '' || timing === '') {
            toast(toastFormatter('Error', `Fill the details`, 'error'));
            return;
        }
        try {
            setisLoading(true);
            let payload = { ...leads, ...state, events: [eventDetails], package: packages };
            console.log(payload);

            const res = await postCommonApi(`/leadapi/addLead`, payload);
            if (res?.success) {
                toast(toastFormatter('Success', `${res?.message}`, 'success'));
                setTimeout(() => navigate('/dashboard'), 5000);
            } else {
                toast(toastFormatter('Error', `${res?.message}`, 'error'));
            }
        } catch (error) {
            console.log(error);
            toast(toastFormatter('Error', `${error}`, 'error'));
        } finally {
            setisLoading(false);
        }
    };

    const eventOptions = leads.leadType === 'Regular'
        ? ["Cocktail", "Anniversary", "Retirement", "Maternity", "Baby Shower", "Birthday"]
        : ["Engagement", "Pre-Wedding", "Wedding"];

    // Dynamically update package options based on the selected event name
    useEffect(() => {
        switch (eventDetails.name) {
            case "Cocktail":
            case "Anniversary":
            case "Retirement":
            case "Baby Shower":
            case "Birthday":
                setPackageOptions(["Pearl", "Ruby", "Diamond"]);
                break;
            case "Maternity":
            case "Pre-Wedding":
                setPackageOptions(["Silver", "Gold", "Platinum"]);
                break;
            case "Engagement":
            case "Wedding":
                setPackageOptions(["Classic", "Premium", "Luxury"]);
                break;
            default:
                setPackageOptions([]);
        }
    }, [eventDetails.name]);

    return (
        <Flex bg={'var(--blue-color)'} h={'100vh'} flexDir={'column'} pos={'relative'}>
            <Image src='/images/bg-design1.png' pos={'fixed'} width={'50%'} top={'-4rem'} right={'-7rem'} zIndex={1} />
            <>
                <Flex minH={'8vh'} px={'1rem'} gap={'1rem'} alignItems={'center'} justify={'space-between'}>
                    <Link to={'/addLeads'}>
                        <Flex gap={'0.8rem'} color={'white'}>
                            <IoIosArrowBack fontSize={'1.5rem'} />
                            <Text>Add Leads</Text>
                        </Flex>
                    </Link>
                    <Image src='/images/image-top.png' h={'2rem'} />
                </Flex>
                <Flex pos={'relative'} zIndex={2} flexDir={'column'} flex={'1'} bg={'white'} borderRadius={'10px 10px 0 0'} p={'1rem'}>
                    <Flex gap={'1.2rem'} flexDir={'column'}>
                        <Text ml={'0.5rem'} fontWeight={600}>Event Details</Text>
                        <InputWrapper title={'Event Specials Name'}>
                            <Input value={leads?.eventSpecialsName} onChange={(e) => { setleads((prev) => ({ ...prev, eventSpecialsName: e.target.value })) }} type={'text'} placeholder={'Enter name'} />
                        </InputWrapper>
                        <InputWrapper title={'Special Code'}>
                            <Input value={leads?.specialCode} onChange={(e) => { setleads((prev) => ({ ...prev, specialCode: e.target.value })) }} type={'email'} placeholder={'Enter code'} />
                        </InputWrapper>
                        <InputWrapper title={'Event Type'}>
                            <Select value={leads?.leadType} onChange={(e) => { setleads((prev) => ({ ...prev, leadType: e.target.value })) }}>
                                <option value="Regular">Regular</option>
                                <option value="Seasonal">Seasonal</option>
                            </Select>
                        </InputWrapper>

                        <InputWrapper title={'Event Name'}>
                            <Select value={eventDetails?.name} onChange={(e) => { seteventDetails((prev) => ({ ...prev, name: e.target.value })) }}>
                                <option value="">Select Event</option>
                                {eventOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </Select>
                        </InputWrapper>

                        <InputWrapper title={'Event Location'}>
                            <Input value={eventDetails?.location} onChange={(e) => { seteventDetails((prev) => ({ ...prev, location: e.target.value })) }} type={'text'} placeholder={'Enter location'} />
                        </InputWrapper>
                        <InputWrapper title={'Event Timing'}>
                            <Input value={eventDetails?.timing} onChange={(e) => { seteventDetails((prev) => ({ ...prev, timing: e.target.value })) }} type={'time'} placeholder={'Enter timing'} />
                        </InputWrapper>

                        <DatePickerWrapper title={'Event Date'}>
                            <Flatpickr
                                className='customFlatpicker'
                                value={toDate}
                                onChange={handleToDateChange}
                                options={{
                                    altFormat: "d-m-Y",
                                    dateFormat: "Y-m-d",
                                    minDate: Date.now() - 1,
                                    altInput: true
                                }}
                            />
                        </DatePickerWrapper>

                        <InputWrapper title={'Package'}>
                            <Select value={packages?.name} onChange={(e) => { setpackages((prev) => ({ ...prev, name: e.target.value })) }}>
                                <option value="">Select Package</option>
                                {packageOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </Select>
                        </InputWrapper>

                        <InputWrapper title={'Client\'s Budget'}>
                            <Input value={packages?.amount} onChange={(e) => { setpackages((prev) => ({ ...prev, amount: e.target.value })) }} type={'number'} placeholder={'Enter Budget'} />
                        </InputWrapper>

                        <Button isLoading={isLoading} onClick={goToEvents} w={'full'} bg={'#59509B'} _hover={{ bg: '#59509B' }} color={'white'} size={'sm'} py={'1.4rem'} borderRadius={'lg'}>
                            Submit
                        </Button>
                    </Flex>
                </Flex>
            </>
        </Flex>
    )
}

export default AddEvent;
