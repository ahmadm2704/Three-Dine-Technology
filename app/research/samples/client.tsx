"use client";

import { FileText, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ResearchSamplesClient({ samples }: { samples: any[] }) {
    return (
        <div className="bg-white text-black min-h-screen">
            <section className="py-24 px-4 text-center border-b border-black">
                <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">Research Samples</h1>
                <p className="text-xl text-gray-600">Access our open-source findings and technical reports.</p>
            </section>

            <section className="max-w-5xl mx-auto px-4 py-16">
                <div className="space-y-4">
                    {samples.length === 0 ? (
                        <div className="text-center text-gray-500 italic py-12">No publications available at this time. Check back soon.</div>
                    ) : (
                        samples.map((sample, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center border border-black p-6 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mr-6 shrink-0">
                                    <FileText className="w-6 h-6" />
                                </div>

                                <div className="flex-grow text-center md:text-left mb-4 md:mb-0">
                                    <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">Published Paper</div>
                                    <h3 className="text-xl font-bold uppercase">{sample.title}</h3>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Published: {sample.publication_date}
                                        {sample.file_size ? ` • Size: ${sample.file_size}` : ''}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{sample.abstract}</p>
                                </div>

                                {sample.file_url ? (
                                    <a href={sample.file_url} target="_blank" className="flex items-center px-6 py-3 border-2 border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors">
                                        Download <Download className="ml-2 w-4 h-4" />
                                    </a>
                                ) : (
                                    <span className="px-6 py-3 border-2 border-gray-200 text-gray-400 font-bold uppercase text-sm cursor-not-allowed">
                                        Unavailable
                                    </span>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-lg text-gray-600 mb-6">Need access to our full archive?</p>
                    <Link href="/research/contact" className="inline-flex items-center font-bold uppercase border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors">
                        Request Archival Access <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    )
}
