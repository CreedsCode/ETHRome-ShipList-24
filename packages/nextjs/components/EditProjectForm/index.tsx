"use client"

import FormContext from "../../context/Form.context";
import {useForm} from "react-hook-form";

const EditProjectForm = () => {
    const {
        setValue,
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = () => {

    };

    const onError = () => {

    };

    return (
        <FormContext.Provider value={{setValue, errors, watch, control}}>
            <form onSubmit={handleSubmit(onSubmit, onError)} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
                    <input type="text" id="name" name="name"
                           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           placeholder="Enter the project name" required/>
                </div>

                <div className="mb-4">
                    <label htmlFor="description"
                           className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" name="description"
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="Enter the project description" required></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                    <input type="text" id="industry" name="industry"
                           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           placeholder="Enter the industry" required/>
                </div>

                <div className="mb-4">
                    <label htmlFor="stage" className="block text-sm font-medium text-gray-700">Stage</label>
                    <select id="stage" name="stage"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="idea">Idea</option>
                        <option value="prototype">Prototype</option>
                        <option value="mvp">MVP</option>
                        <option value="growth">Growth</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="fundingGoal" className="block text-sm font-medium text-gray-700">Funding
                        Goal</label>
                    <input type="number" id="fundingGoal" name="fundingGoal"
                           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           placeholder="Enter the funding goal" required/>
                </div>

                <div className="mb-4">
                    <label htmlFor="fundingReceived" className="block text-sm font-medium text-gray-700">Funding
                        Received</label>
                    <input type="number" id="fundingReceived" name="fundingReceived"
                           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           placeholder="Enter the funding received" required/>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Cofounder Needed</label>
                    <div className="mt-2 space-y-2">
                        <label className="inline-flex items-center">
                            <input type="radio" name="cofounderNeeded" value="true" className="form-radio"
                                   required/>
                            <span className="ml-2">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" name="cofounderNeeded" value="false" className="form-radio"
                                   required/>
                            <span className="ml-2">No</span>
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Accepts Service for Equity</label>
                    <div className="mt-2 space-y-2">
                        <label className="inline-flex items-center">
                            <input type="radio" name="acceptsServiceForEquity" value="true" className="form-radio"
                                   required/>
                            <span className="ml-2">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" name="acceptsServiceForEquity" value="false" className="form-radio"
                                   required/>
                            <span className="ml-2">No</span>
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="serviceNeeds" className="block text-sm font-medium text-gray-700">Service
                        Needs</label>
                    <input type="text" id="serviceNeeds" name="serviceNeeds"
                           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           placeholder="Describe the service needs (optional)"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact
                        Email</label>
                    <input type="email" id="contactEmail" name="contactEmail"
                           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           placeholder="Enter your contact email" required/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="hrbNumber" className="block text-sm font-medium text-gray-700">HRB Number
                            (optional)</label>
                        <input type="text" id="hrbNumber" name="hrbNumber"
                               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>

                    <div>
                        <label htmlFor="vatId" className="block text-sm font-medium text-gray-700">VAT ID
                            (optional)</label>
                        <input type="text" id="vatId" name="vatId"
                               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label htmlFor="instaUrl" className="block text-sm font-medium text-gray-700">Instagram URL
                            (optional)</label>
                        <input type="url" id="instaUrl" name="instaUrl"
                               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>

                    <div>
                        <label htmlFor="facebookUrl" className="block text-sm font-medium text-gray-700">Facebook
                            URL (optional)</label>
                        <input type="url" id="facebookUrl" name="facebookUrl"
                               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>

                    <div>
                        <label htmlFor="linkedInUrl" className="block text-sm font-medium text-gray-700">LinkedIn
                            URL (optional)</label>
                        <input type="url" id="linkedInUrl" name="linkedInUrl"
                               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="wageEquityBalance" className="block text-sm font-medium text-gray-700">Wage/Equity
                        Balance (0-1)</label>
                    <input type="number" step="0.01" min="0" max="1" id="wageEquityBalance" name="wageEquityBalance"
                           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           placeholder="Enter wage/equity balance (optional)"/>
                </div>

                <div className="flex justify-end">
                    <button type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit Project
                    </button>
                </div>
            </form>
        </FormContext.Provider>
    );
}

export default EditProjectForm;
