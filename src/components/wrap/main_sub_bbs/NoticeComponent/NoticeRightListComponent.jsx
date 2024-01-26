import React from "react";
import { Link, useNavigate } from 'react-router-dom';


export default function NoticeRightListComponent({ notice }) {

    const [list] = React.useState(6);  // 한화면에 보여질 목록개수
    const [pageNumber, setPageNumber] = React.useState(1); // 페이지번호
    const [groupPage] = React.useState(7); // 페이지번호 그룹1(1(1~5) 그룹2(6!~10) 그룹3(11~15) 그룹4(16~20))
    const [cnt, setCnt] = React.useState(1); // 페이지번호 그룹 1

    const [startNum, setStartNum] = React.useState(); // 그룹 시작 번호
    const [endtNum, setEndtNum] = React.useState();  // 그룹 끝 번호

    //  페이지번호 클릭 이벤트
    const onClickPageNum = (e, num) => {
        e.preventDefault();
        setPageNumber(num);
    }

    // 그룹페이지 클릭  다음카운트 이벤트
    const onClickNextGroup = (e) => {
        e.preventDefault();
        setCnt(cnt + 1);
    }

    // 그룹페이지 클릭  이전카운트 이벤트
    const onClickPrevGroup = (e) => {
        e.preventDefault();
        setCnt(cnt - 1);
    }

    // 그룹 시작번호 설정 => cnt 또는 groupPage 값 변경이 있거나 설정되었다면 시작번호 설정 실행
    React.useEffect(() => {
        setStartNum((cnt - 1) * groupPage);
    }, [cnt, groupPage]);

    // 그룹 끝번호 설정
    React.useEffect(() => {
        setEndtNum(startNum + groupPage);
    }, [startNum, groupPage]);

    // 그룹 시작페이지 설정 => 그룹페이지 이동시 그룹의 첫페이지 설정
    React.useEffect(() => {
        setPageNumber(startNum + 1);
    }, [endtNum, startNum]);

    return (
        <div id='noticeRight'>
            <div className="container">
                <div className="title">
                    <h3>공지사항<span>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</span></h3>
                </div>
                <div className="content">
                    <dl>
                        <dt>
                            <span>번호</span>
                            <span>제목</span>
                            <span>조회수</span>
                            <span>작성일</span>
                        </dt>

                        {
                            notice.map((item, idx) => { // 100개 => 0 1 2 3 4  .. 99

                                if (Math.ceil((idx + 1) / list) === pageNumber) { // 클릭번튼 번호 전달 1(100~86) 2(85~70) 3 4 5 6 7

                                    return (
                                        <dd key={item.번호} data-key={item.번호}>

                                            <span>{item.번호}</span>
                                            {/* 
                                                        서치파람스 searchParams() 활용 
                                                        1. 파라미터를 링크 태그에 직접 설정한다. 키=키값&키=키값
                                                        2. 선언
                                                           import {useSearchParams} from 'react-router-dom';
                                                        3. 변수 = 훅 사용
                                                            const [param, setParam] = useSearchParams();
                                                            const 번호 = param.get('번호'); // 보내온 키를 이용 키값을 가져온다.
                                                            const 제목 = param.get('제목'); // 보내온 키를 이용 키값을 가져온다.
                                                            const 내용 = param.get('내용'); // 보내온 키를 이용 키값을 가져온다.
                                                            const 작성자 = param.get('작성자'); // 보내온 키를 이용 키값을 가져온다.
                                                            const 작성일 = param.get('작성일'); // 보내온 키를 이용 키값을 가져온다.
                                                        
                                                    */}

                                            <span>
                                                <Link to={`/notice_view?번호=${item.번호}&제목=${item.제목}&내용=${item.내용}&작성자=${item.작성자}&작성일=${item.작성일}&조회수=${item.조회수}`}>  {/* 쿼리스트링 => 파라미터 => 글보기 페이지 */}{item.제목}</Link>
                                            </span>


                                            {/* 
                                                        useNavigate()  => useLocation()
                                                        1. 선언
                                                        import {Link, useNavigate} from 'react-router-dom';
                                                        2. 파라미터값을 객체 state 설정
                                                        navigate('/idSearchResult', {state: {번호: item.번호, 제목: item.제목, 내용: item.내용, 작성자: item.작성자, 작성일: item.작성일}}); 

                                                        3. 훅 선언하고 변수 사용
                                                        useLocation() 글목록을 클릭해서 버튼이벤트 작성후 리터문 위에서 코딩하는경우
                                                        const location = useLocation(); 훅 Hook
                                                        4. 변수 속성 이용 바인딩    
                                                        location.state.아이디  바인딩 Binding
                                                      
                                                    */}
                                            <span>{item.조회수}</span>
                                            <span>{item.작성일}</span>

                                        </dd>
                                    )
                                }
                            })

                        }
                    </dl>

                    <div className="page-button-box">

                        {cnt > 1 && <a href="!#" className="prev-btn" onClick={onClickPrevGroup}>&lt;</a>}
                        {
                            (() => {
                                let arr = [];  // 페이지번호와 a 태그 모두 저장된 배열변수
                                for (let i = startNum; i < endtNum; i++) {
                                    if (i < Math.ceil(notice.length / list)) { // 100/6
                                        arr = [...arr, <a key={i} data-key={`num${i}`} className={pageNumber === (i + 1) ? 'on' : null} href="!#" onClick={(e) => onClickPageNum(e, (i + 1))}>{i + 1}</a>]
                                        // arr.push( <a href="!#" onClick={(e)=>onClickPageNum(e, (i+1))}>{i+1}</a> );
                                    }
                                }
                                return arr
                            })()
                        }
                        {cnt < Math.ceil(notice.length / list / groupPage) && <a href="!#" className="next-btn" onClick={onClickNextGroup}>&gt;</a>}

                    </div>

                </div>
            </div>
        </div>
    );
};