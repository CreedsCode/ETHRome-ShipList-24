'use client'

import React, { useState, useEffect } from 'react';
import {IProject, ServiceNeed, ServiceType} from "~~/models";

const ProjectGrid = ({ projects }: { projects: IProject[] }) => {
    const [visibleProjects, setVisibleProjects] = useState<IProject[]>([]);
    const [filters, setFilters] = useState({
        stage: '',
        fundingGoal: '',
        serviceType: '',
        sortBy: 'createdAt'
    });
    const [page, setPage] = useState(1);

    useEffect(() => {
        const loadMoreProjects = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', loadMoreProjects);
        return () => window.removeEventListener('scroll', loadMoreProjects);
    }, []);

    useEffect(() => {
        const start = (page - 1) * 10;
        const newVisibleProjects = projects.slice(0, start + 10); // Load 10 projects per page
        setVisibleProjects(newVisibleProjects);
    }, [page, projects]);

    const applyFilters = () => {
        let filteredProjects = projects;

        if (filters.stage) {
            filteredProjects = filteredProjects.filter((p) => p.stage === filters.stage);
        }
        if (filters.fundingGoal) {
            filteredProjects = filteredProjects.filter((p) => p.fundingGoal >= parseInt(filters.fundingGoal));
        }
        if (filters.serviceType) {
            filteredProjects = filteredProjects.filter((p) =>
                p.serviceNeeds?.some((s: ServiceNeed) => s.serviceType === filters.serviceType)
            );
        }
        filteredProjects = filteredProjects.sort((a, b) =>
            filters.sortBy === 'createdAt' ? b.createdAt.getTime() - a.createdAt.getTime() : 0
        );

        return filteredProjects.slice(0, page * 10);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="p-6">
            {/* Filters */}
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <select name="stage" className="p-2 border" onChange={handleFilterChange}>
                    <option value="">Stage</option>
                    <option value="idea">Idea</option>
                    <option value="prototype">Prototype</option>
                    <option value="mvp">MVP</option>
                    <option value="growth">Growth</option>
                </select>

                <input
                    type="number"
                    name="fundingGoal"
                    placeholder="Funding Goal"
                    className="p-2 border"
                    onChange={handleFilterChange}
                />

                <select name="serviceType" className="p-2 border" onChange={handleFilterChange}>
                    <option value="">Service Type</option>
                    {Object.values(ServiceType).map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>

                <select name="sortBy" className="p-2 border" onChange={handleFilterChange}>
                    <option value="createdAt">Sort by Created Date</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {applyFilters().map((project) => (
                    <div key={project.id} className="border p-4 rounded shadow">
                        <h2 className="font-bold text-xl">{project.name}</h2>
                        <p className="text-gray-600">{project.description}</p>
                        <p className="text-sm text-gray-400">Stage: {project.stage}</p>
                        <p className="text-sm text-gray-400">Funding Goal: {project.fundingGoal}</p>
                        <p className="text-sm text-gray-400">Service Type: {project.serviceNeeds?.map(sn => sn.serviceType).join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectGrid;
