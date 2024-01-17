import Navbar from './header';

const Layout = (props: any) => (
    <>
        {/* <Head>
            <title>Ghothique</title>
            <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel="icon" href="/favicon.ico" />
        </Head> */}
        <div>
            <Navbar />
            <main className='min-h-[92dvh] bg-[#0b111b]'>
                {props.children}
            </main>
        </div>
    </>
);
export default Layout;
