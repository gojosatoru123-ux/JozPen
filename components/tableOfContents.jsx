'use client';

import React, { useEffect, useState } from 'react';

const TableOfContents = () => {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const headingElements = document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6');
        
        const newHeadings = Array.from(headingElements).map((el, index) => {
            const level = parseInt(el.tagName.charAt(1));
            const text = el.textContent;
            const id = `heading-${index}-${text.replace(/\s+/g, '-').toLowerCase()}`;
            el.id = id;
            return { level, text, id };
        });
        setHeadings(newHeadings);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -70% 0px' }
        );

        headingElements.forEach((heading) => {
            observer.observe(heading);
        });

        return () => {
            headingElements.forEach((heading) => {
                observer.unobserve(heading);
            });
        };
    }, []);

    const scrollToHeading = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="hidden md:block table-of-contents p-6 rounded-xl sticky top-24 h-[300px] max-w-[300px]">
            <h4 className="font-semibold text-lg text-gray-900 mb-4 border-b pb-2">On this page</h4>
            <ul className="list-none space-y-2">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={`text-sm cursor-pointer transition-all duration-300 ease-in-out truncate ${
                            activeId === heading.id
                                ? 'font-bold text-blue-600'
                                : 'text-gray-600 hover:text-blue-500'
                        }`}
                        style={{ marginLeft: `${(heading.level - 1) * 15}px` }}
                        onClick={() => scrollToHeading(heading.id)}
                        title={heading.text}
                    >
                        {heading.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TableOfContents;