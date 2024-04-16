import { useState } from 'react'
import './index.css'
import { Link, NavLink } from 'react-router-dom';
import Cart from '../Cart';
import { Card, Col, Container, Dropdown, DropdownButton, Row, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../Hook/useFetch';
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa6';
import Image from 'react-bootstrap/Image';

function Header() {
    const { i18n } = useTranslation();
    const handleChangeLng = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('lng', lng);
    }
    const [navbar, setNavbar] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 100) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }
    const requestOptions = {
        method: 'POST',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiNmJjZWFhNWFlYWRkZTQyNDY3ZDZkYmJmMTVlMDhkMmVjMjZkZGM4Yjc5ZDZlZWM5NGIwODliOWRlMDUzNTdlMmE5YWUyOTc4ZjVhYzM5MTQiLCJpYXQiOjE2OTEwMDUwMDMuMjI5NzQzLCJuYmYiOjE2OTEwMDUwMDMuMjI5NzQ2LCJleHAiOjE3MjI2Mjc0MDMuMTA4MzU0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.VPsULN8PnrW5EzFxiYlyn5R8ML4w0le-FvZFf1IxMOj2o2NVMUg-EERqJdKV3YWn2NquVgW8-SOPkmCtWJ4kfA_UZdaJ2JUkm0qo39cSNLt2AylXP8s4_pBK6cVBI8xo98fTkcoXgj-hDk6B04t4S2wIu7ddxSfgVdcWbVorN4Woac4i40d3xf6Iu-DnOfs6m5RKGDpOrzExQDrIn6A5_efpcNf1-I3rGgf00aAar2vKtdtZjFAzcVpDKMLm36Q-A0Yl54uEuC_e2RI2nsRhjtK7P0CwSPXzYyz29lU_k47WWJp4nVb0prt_-D5OHHk81LkFZqTiuiw5AB88_l3q65PG20oo8HSTW2c3hV1XPFHwhdVsjLncFX3TWhHUyHAIN48qBOiXl9JVmfeUj6t6uTurjRnaH-kykSke2dUPE77gCiMsLDUYA1dMD8EU42Y3F1tLWs4_CoXiwpjR2TGdjACY4FBHPwOAyrBpLIUKypeBcx3xrWcU2uZS7iTtQS_C2uhGyeMy0xSeBr0S0GICoJmiHmRUMc9gEHzlv40ObZpncXmw7VX1Txc5-DS6Y-GgjKjIPmmVQOWSJbjU7OqMtSaGyjmOTtECwgtlmFpfwEi0_g8L8T2OzgZVYOOROkzxOYnuCB1NLfj2N-NFcZ1cXUvB915l8C-v5ZD9Uulmxmsi',
        body: JSON.stringify({
        })
    };
    const { data, loading, error } = useFetch("http://192.168.1.32/api/categorias", requestOptions);
    const categorias = data;
    window.addEventListener('scroll', changeBackground);
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!categorias) return <div>No se encontraron tours</div>;
    return (
        <>
            {
                navbar ? (

                    <Row className='w-100 m-0 fixed-navbar'>
                        <Col md={12} className='bg-white d-flex justify-content-center align-items-center p-2'>
                            <Container>
                                <Image src="holder.js/171x180" rounded />
                                <Container>
                                    <Row></Row>
                                </Container>
                            </Container>
                        </Col>
                        <Col md={12} className='bg-primary d-flex justify-content-center align-items-center p-0'>
                            <Nav className="d-flex align-items-center text-white">
                                <NavLink className="nav-link text-white" to='/'>Home</NavLink>

                                {categorias.map((tour) => (
                                    <li className="nav-item d-flex align-items-center text-white" key={tour.id}>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="transparent" id={`dropdown-${tour.id}`} className="nav-link p-0">
                                                {tour.nombre}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className='drpwdpwm-menu'>
                                                <div className="menuvertigo">
                                                    <Container className='p-4'>
                                                        <Row className='w-100'>
                                                            <Col md={8}>
                                                                <Row >
                                                                    {tour.tours.map((categoria) => (
                                                                        <Col key={categoria.id}>
                                                                            <NavLink to={`/tours/${categoria.id}`} className='nav-link tittle-categoria-header w-100'>
                                                                                {categoria.nombre}
                                                                            </NavLink>
                                                                        </Col>
                                                                    ))}
                                                                </Row>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Container className='d-flex justify-content-center'>
                                                                    <Card style={{ width: '18rem' }}>
                                                                        <Card.Img variant="top" src="https://vertigotravelperu.com/wp-content/uploads/2022/09/manu1.png" />
                                                                    </Card>
                                                                </Container>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </div>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                ))}
                                <NavLink className="nav-link text-white" to='/'>Blog</NavLink>
                            </Nav>
                        </Col>
                    </Row>
                ) : (
                    <Row className='w-100 m-0 fixed-navbar' >
                        < Col md={3} className='bg-dark p-4 py-2 d-flex justify-content-center align-items-center'>
                            <img src="../src/assets/images/vertigo-logo-horizontal-2.webp" className="img-size" alt="logo-vertigo" />
                        </Col >
                        <Col md={9} className='bg-white'>
                            <Row className='w-100'>
                                <Col md={7} className='bg-white d-flex justify-content-start align-items-center'>
                                    <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                                        <FaEnvelope />
                                        <p className="mb-0">info@example.com</p>
                                    </div>
                                    <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                                        <FaEnvelope />
                                        <p className="mb-0">info@example.com</p>
                                    </div>
                                </Col>
                                <Col md={5} className='bg-dark bg-white d-flex justify-content-end align-items-center px-2'>
                                    <div className="d-inline-flex align-items-center py-2">
                                        <a className="me-3" href=""><FaFacebookF /></a>
                                        <a className="me-3" href=""><FaTwitter /></a>
                                        <a className="me-3" href=""><FaLinkedin /></a>
                                        <a className="me-3" href=""><FaInstagram /></a>
                                        <a className="" href=""><FaYoutube /></a>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} className='bg-dark d-flex justify-content-end align-items-center p-2'>
                                    <Nav className="d-flex align-items-center text-white">
                                        <NavLink className="nav-link text-white" to='/'>Home</NavLink>
                                        <NavLink className="nav-link text-white" to='/'>About</NavLink>
                                        <NavLink className="nav-link text-white" to='/'>Services</NavLink>
                                        <NavLink className="nav-link text-white" to='/'>Contact</NavLink>
                                        <NavLink className="nav-link text-white" to='/'>Blog</NavLink>
                                    </Nav>
                                </Col>
                            </Row>
                        </Col>
                    </Row >
                )
            }
        </>
    )
}

export default Header


