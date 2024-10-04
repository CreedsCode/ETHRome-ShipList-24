"use client"

import FormContext from "../../context/Form.context";
import {useForm} from "react-hook-form";
import {IProjectFormData, ISelectOption} from "~~/models";
import {useIpfs} from "~~/hooks/ipfs.hook";
import TextInput from "../form/TextInput";
import TextArea from "~~/components/form/TextAreaInput";
import NumberInput from "~~/components/form/NumberInput";
import DropDown from "~~/components/form/DropDown";
import CheckRadioBox from "~~/components/form/CheckRadioBox";
import {useState} from "react";
import {notification} from "~~/utils/scaffold-eth";

const stageOptionList: ISelectOption[] = [
    {label: 'Idea', value: 'idea'},
    {label: 'Prototype', value: 'prototype'},
    {label: 'MVP', value: 'mvp'},
    {label: 'Growth', value: 'growth'},
];

const yesNoOptionList: ISelectOption[] = [
    {label: 'Yes', value: 'true'},
    {label: 'No', value: 'false'},
];

const PROJECT_DEFAULT_DATA: IProjectFormData = {
    coFounderNeeded: false,
    contactEmail: "",
    description: "",
    fundingGoal: 0,
    fundingReceived: 0,
    industry: "",
    name: "",
    stage: "mvp",
}

const EditProjectForm = () => {
    const {
        setValue,
        control,
        watch,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm<IProjectFormData>(
        {
            mode: 'onSubmit',
            reValidateMode: 'onSubmit',
/*            resolver: joiResolver(Joi.object(PROJECT_FORM_VALIDATOR)),*/
            defaultValues: PROJECT_DEFAULT_DATA
        }
    );
    const {uploadToIpfs, ipfsHash} = useIpfs();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const onSubmit = async (data: IProjectFormData) => {
        setIsSubmitting(true);
        try {
            const res = await uploadToIpfs(data);
            console.log(ipfsHash);
/*
            reset();
*/
            console.log('send success toast res: ', res);
            notification.success('Your project has been submitted');
        } catch (e) {
            console.error('Error on EditProjectForm onSubmit', e);
            notification.error('Opps that did not work, trying again won\'t help cause we messed up');
        } finally {
            setIsSubmitting(false);
        }
    };

    const onError = (e: any) => {
        console.error('Error on EditProjectForm onError', e);
    };

    return (
        <FormContext.Provider value={{setValue, errors, watch, control}}>
            <form onSubmit={handleSubmit(onSubmit, onError)}
                  className="w-8/12 mx-auto p-4 bg-white shadow-md rounded-md"
            >

                <TextInput name={'name'} label={'Project Name'}/>

                <TextArea name={'description'} label={'Description'}/>

                <TextInput name={'industry'} label={'Industry'}/>

                <DropDown name={'stage'} options={stageOptionList}></DropDown>

                <NumberInput name={'fundingGoal'} label={'Funding Goal'}/>

                <NumberInput name={'fundingReceived'} label={'Funding Received'}/>

                <DropDown name={'stage'} options={stageOptionList}></DropDown>

                <CheckRadioBox type={'radio'} label={'Cofounder Needed'} options={yesNoOptionList}
                               name={'cofounderNeeded'}/>

                <CheckRadioBox type={'radio'} label={'Accepts Service for Equity'} options={yesNoOptionList}
                               name={'acceptsServiceForEquity'}/>

                <h1>Service Needs</h1>

                {/* Service Needs */}

                <TextInput name={'contactEmail'} type={'email'} label={'E-Mail'}/>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <TextInput name={'hrbNumber'} label={'HRB Number (optional)'}/>

                    <TextInput name={'vatId'} label={'VAT ID (optional)'}/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <TextInput type={'url'} name={'instaUrl'} label={'Instagram (optional)'}/>

                    <TextInput type={'url'} name={'facebookUrl'} label={'Facebook (optional)'}/>

                    <TextInput type={'url'} name={'linkedInUrl'} label={'LinkedIn (optional)'}/>
                </div>

                <div className="flex justify-end">
                    <button type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit Project
                        {isSubmitting && (
                            <div className="loading align-middle justify-center ml-4 loading-spinner loading-xs"></div>
                        )}
                    </button>
                </div>
            </form>
        </FormContext.Provider>
    );
}

export default EditProjectForm;
