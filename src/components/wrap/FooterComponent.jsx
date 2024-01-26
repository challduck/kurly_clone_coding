import React from 'react';

export default function FooterComponent() {
    return (
        <footer id='footer'>
            <div className="row row1">
                <div className="container">
                    <div className='content'>
                        <div className="left">
                            <ul>
                                <li><h2>고객행복센터</h2></li>
                                <li>
                                    <a href="tel:1644-1107">1644-1107</a>
                                    <em>월~토요일 오전 7시 - 오후 6시</em>
                                </li>
                                <li>
                                    <button>카카오톡 문의</button>
                                    <span>
                                        월~토요일 <i>|</i> 오전 7시 - 오후 6시<br />
                                        월~토요일 <i>|</i> 오전 7시 - 오후 6시
                                    </span>
                                </li>
                                <li>
                                    <button>1:1 문의</button>
                                    <span>
                                        365<br />
                                        고객센터 운영시간에 순차적으로 답변드리겠습니다.
                                    </span>
                                </li>
                                <li>
                                    <button>카카오톡 문의</button>
                                    <span>
                                        월~금요일 <i>|</i> 오전 9시 - 오후 6시<br />
                                        점심시간 <i>|</i> 낮 12시 - 오후 1시
                                    </span>
                                </li>
                                <li>
                                    비회원 문의 : <a href="mailto:help@kurlycorp.com">help@kurlycorp.com</a><br />
                                    회원 대량주문 문의 : <a href="mailto:help@kurlycorp.com">help@kurlycorp.com</a>
                                </li>
                            </ul>
                        </div>
                        <div className="right">
                            <ul>
                                <li>
                                    <a href="!#">컬리소개</a>
                                    <a href="!#">컬리소개영상</a>
                                    <a href="!#">인재채용</a>
                                    <a href="!#">이용약관</a>
                                    <a href="!#">개인정보처리방침</a>
                                    <a href="!#">이용약관</a>
                                </li>
                                <li>
                                    법인명 (상호) : 주식회사 컬리  <i>|</i>  사업자등록번호 : 261-81-23567 <a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2618123567&apv_perm_no=">사업자정보 확인</a><br />
                                    통신판매업 : 제 2018-서울강남-01646 호  <i>|</i>   개인정보보호책임자 : 이원준<br />
                                    주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동)  <i>|</i>   대표이사 : 김슬아<br />
                                    입점문의 : <a href="https://accounts.google.com/v3/signin/identifier?dsh=S-217102823%3A1678776522222184&continue=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2Fe%2F1FAIpQLScLB7YkGJwNRzpGpp0gbR1i4C1_uvTEFj43SFfJ_XEadTn3gQ%2Fviewform%3Fusp%3Dsf_link&followup=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2Fe%2F1FAIpQLScLB7YkGJwNRzpGpp0gbR1i4C1_uvTEFj43SFfJ_XEadTn3gQ%2Fviewform%3Fusp%3Dsf_link&ifkv=AWnogHcRkPilgji7sK0qeDkWmKdgRgBjYiP2QDqyQfRrAXsNBrhxGIqHGTIB-3Xjn71zWOBpLpzi&ltmpl=forms&passive=1209600&service=wise&flowName=GlifWebSignIn&flowEntry=ServiceLogin">입점문의하기</a>
                                    <i>|</i> 제휴문의 : <a href="mailto:business@kurlycorp.com">business@kurlycorp.com</a><br />
                                    채용문의 :<a href="recruit@kurlycorp.com">recruit@kurlycorp.com</a><br />
                                    팩스: 070 - 7500 - 6098
                                </li>
                                <li>
                                    <a href="!#"><img src={process.env.PUBLIC_URL + "/images/sign_up/ico_instagram.png"} alt="" /></a>
                                    <a href="!#"><img src={process.env.PUBLIC_URL + "/images/sign_up/ico_fb.png"} alt="" /></a>
                                    <a href="!#"><img src={process.env.PUBLIC_URL + "/images/sign_up/ico_blog.png"} alt="" /></a>
                                    <a href="!#"><img src={process.env.PUBLIC_URL + "/images/sign_up/ico_naverpost.png"} alt="" /></a>
                                    <a href="!#"><img src={process.env.PUBLIC_URL + "/images/sign_up/ico_youtube.png"} alt="" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row row2">
                <div className="container">
                    <div className='content'>
                        <ul>
                            <li>
                                <img src={process.env.PUBLIC_URL + "/images/sign_up/logo_isms.svg"} alt="" />
                                <span>
                                    [인증범위] 컬리 쇼핑몰 서비스 개발·운영<br />
                                    (심사받지 않은 물리적 인프라 제외)<br />
                                    [유효기간] 2022.01.19 ~ 2025.01.18
                                </span>
                            </li>
                            <li>
                                <img src={process.env.PUBLIC_URL + "/images/sign_up/logo_privacy.svg"} alt="" />
                                <span>
                                    개인정보보호 우수 웹사이트 ·<br />
                                    개인정보처리시스템 인증 (ePRIVACY PLUS)
                                </span>
                            </li>
                            <li>
                                <img src={process.env.PUBLIC_URL + "/images/sign_up/logo_tosspayments.svg"} alt="" />
                                <span>
                                    토스페이먼츠 구매안전(에스크로)<br />
                                    서비스를 이용하실 수 있습니다.
                                </span>
                            </li>
                            <li>
                                <img src={process.env.PUBLIC_URL + "/images/sign_up/logo_wooriBank.svg"} alt="" />
                                <span>
                                    고객님이 현금으로 결제한 금액에 대해 우리은행과<br />
                                    채무지급보증 계약을 체결하여 안전거래를 보장하고<br />
                                    있습니다.
                                </span>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            <div className="row  row3">
                <div className="container">
                    <div className='content'>
                        <p>
                            컬리에서 판매되는 상품 중에는 컬리에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.<br />
                            마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.
                        </p>
                        <p>
                            &copy; KURLY CORP. ALL RIGHTS RESERVED
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};