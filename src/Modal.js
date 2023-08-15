import React, { useState, useRef, useEffect } from 'react'
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'

const Modal = () => {
    const ref = useRef(null);
    const ref1 = useRef(null);
    const [click, setclick] = useState(true)
    const handleClick = (e) => {
        if (e.target.innerText === 'Sign Up') {
            setclick(true)
        } else {
            setclick(false)
        }

    }
    useEffect(() => {
        const user = localStorage.getItem('scrap')
        if (!user) {
            ref1.current.click()

        }

    }, []);
    const close = () => {
        ref.current.click()
    }

    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={ref1} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="btn-group w-100" role="group" aria-label="Basic outlined example">
                                <button type="button" onClick={handleClick} className="btn btn-outline-primary w-50" style={{

                                }}>Sign Up</button>
                                <button type="button" onClick={handleClick} className="btn btn-outline-primary w-50">Login</button>

                            </div>
                        </div>
                        <div className="modal-body">
                            {
                                click ? <RegistrationForm close={close} /> : <LoginForm close={close} />
                            }
                        </div>
                        <div className="modal-footer d-none">
                            <button type="button" ref={ref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal