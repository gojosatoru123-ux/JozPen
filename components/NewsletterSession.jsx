
'use client';
import { useState } from 'react';

// NewsletterSession component for newsletter signup
export default function NewsletterSession() {
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [status, setStatus] = useState(''); // 'ok' or 'fail'

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function onFormSubmit(e) {
        e.preventDefault();
        if (validateEmail(email)) {
            setFeedback('Subscribed! Check your inbox for updates.');
            setStatus('ok');
            setEmail('');
        } else {
            setFeedback('Invalid email address.');
            setStatus('fail');
        }
        setTimeout(() => {
            setFeedback('');
            setStatus('');
        }, 6000);
    }

    return (
        <section className="w-full max-w-xl mx-auto p-5">
            <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-6">
                <header>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Subscribe for Inspiration</h2>
                    <p className="text-gray-600">Get creative tips and updates delivered to your inbox.</p>
                </header>
                <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="border rounded px-4 py-2 focus:ring-2 focus:ring-pink-400"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-pink-500 text-white rounded px-6 py-2 font-semibold hover:bg-pink-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
                {feedback && (
                    <div className={`text-sm mt-2 ${status === 'ok' ? 'text-green-600' : 'text-red-600'}`}>{feedback}</div>
                )}
            </div>
        </section>
    );
}
