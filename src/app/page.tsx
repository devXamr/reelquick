'use client'
import {useState} from "react";
//@ts-ignore
import axios, * as other from "axios"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from 'next/image'
import logo from '../../public/logowithtext.png'



export default function Home() {
    const [reelUrl, setReelUrl] = useState('')
    const [downloadUrl, setDownloadUrl] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    async function downloadReel() {
        try {
            const response = await fetch(downloadUrl);
            const blob = await response.blob();

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'instagram-reel.mp4';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download failed", err);
        }
    }


    async function handleSubmit(){
        if(reelUrl === ''){
            setError(true)
            return
        }

        setError(false)
        setLoading(true)

        const options = {
            method: 'GET',
            url: 'https://instagram-reels-downloader-api.p.rapidapi.com/download',
            params: {
                url: reelUrl
            },
            headers: {
                'x-rapidapi-key': '4e789c6d92mshe5f2f3f5a604071p1aa04cjsnc7b7864208ba',
                'x-rapidapi-host': 'instagram-reels-downloader-api.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            const downloadUrl = response.data.data.medias[0].url
            console.log(downloadUrl)
            setDownloadUrl(downloadUrl)


        } catch (error) {
            console.error(error);
        }
       setSubmitted(true)
       setReelUrl('')
       setLoading(false)
    }

    return (
        <div className='font-primary py-20 max-w-[90%] lg:max-w-[25%] mx-auto'>
            <Image className='w-1/2 mx-auto mb-3' src={logo} alt='reel quick logo' />
            <div className='text-center text-red-500 text-3xl font-semibold'>Insta Reel Downloader</div>
            <div className='text-gray-600 text-sm text-center mt-2  mx-auto'>Download any instagram reel at command.
                Paste a link and it will be ready for download, ReelQuick.
            </div>

            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
                <input value={reelUrl} onChange={(e) => setReelUrl(e.target.value)} type='text'
                       className='block w-full mx-auto mt-5 pr-5 pl-1 py-3 border border-gray-200 text-sm rounded-lg'
                       placeholder='paste url here'/>
                {error && <div className='text-red-500 text-xs'>The field cannot be empty</div>}
                <button type='submit'
                        className='transition-colors duration-100 ease-in-out text-center w-full py-3 bg-red-600  text-white rounded-lg hover:bg-gradient-to-b cursor-pointer mt-4 hover:from-red-400 via-red-500 to-red-600 text-sm font-semibold'>{loading ?                 <AiOutlineLoading3Quarters className='animate-spin text-white mx-auto text-lg mt-0.5'/> :
                    'Submit'}
                </button>
            </form>

            {submitted && downloadUrl && <div className='flex mt-10 pl-4  rounded-xl bg-red-100'>
                <div>
                    <div className='mt-5 text-sm mb-4 text-gray-700'>Your video is ready for download!</div>
                    <button onClick={downloadReel}
                            className='px-5 py-2 cursor-pointer text-sm rounded-lg bg-black text-white'>Download Reel
                    </button>
                </div>
                <video controls width='100%' src={downloadUrl} className='w-[50%] mx-auto rounded-r-xl'/>

            </div>}

            {submitted && !downloadUrl && <div className='w-fit mx-auto mt-10 flex text-sm gap-2'>
                <AiOutlineLoading3Quarters className='animate-spin text-gray-500 mt-0.5'/>
                <div className='text-gray-500'>fetching reel</div>
            </div>}


            <div className='text-xs text-gray-500 absolute bottom-2 lg:w-[25%] w-[95%] mx-auto inset-x-0'>This tool is for personal and educational use only.
                We do not host any videos, and we do not own the content.
                All rights belong to the original creators on Instagram™.</div>


        </div>
    );
}
