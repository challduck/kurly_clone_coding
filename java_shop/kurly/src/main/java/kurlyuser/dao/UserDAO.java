package kurlyuser.dao;

import kurlyuser.DatabaseConnection;
import kurlyuser.dto.CartItemDTO;
import kurlyuser.dto.UserAddressDTO;
import kurlyuser.dto.UserIdFindDTO;
import kurlyuser.dto.UserSignUpDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {

public boolean signup(UserSignUpDTO userDTO) {
    Connection conn = null;
    // Statement.RETURN_GENERATED_KEYS를 사용하여 자동 생성된 키를 검색
    try {
    	String insertUserSql = "INSERT INTO user (user_id, user_pw, user_name, user_email, user_phone, user_postcode, user_addr, user_detail_addr, user_sex, user_birth, user_recommender, user_participation_event_name, user_delete, user_join_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    	conn = DatabaseConnection.getConnection();
        conn.setAutoCommit(false); // 트랜잭션 시작
        try (PreparedStatement insertUserStatement = conn.prepareStatement(insertUserSql, PreparedStatement.RETURN_GENERATED_KEYS)){

            insertUserStatement.setString(1, userDTO.getUserId());
            insertUserStatement.setString(2, userDTO.getUserPw());
            insertUserStatement.setString(3, userDTO.getUserName());
            insertUserStatement.setString(4, userDTO.getUserEmail());
            insertUserStatement.setString(5, userDTO.getUserPhone());
            insertUserStatement.setString(6, userDTO.getUserPostcode());
            insertUserStatement.setString(7, userDTO.getUserAddr());
            insertUserStatement.setString(8, userDTO.getUserDetailAddr());
            insertUserStatement.setString(9, userDTO.getUserSex());
            insertUserStatement.setString(10, userDTO.getUserBirth());
            insertUserStatement.setString(11, userDTO.getUserRecommender());
            insertUserStatement.setString(12, userDTO.getUserParticipationEventName());
            insertUserStatement.setString(13, userDTO.getUserDelete());
            insertUserStatement.setTimestamp(14, userDTO.getUserJoinDate());

            int rowsAffectedUser = insertUserStatement.executeUpdate();

            if (rowsAffectedUser == 0) {
                throw new SQLException("회원 정보 삽입에 실패하였습니다.");
            }

            try (ResultSet generatedKeys = insertUserStatement.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    long userKey = generatedKeys.getLong(1);

                    String insertAddressSql = "INSERT INTO user_address (user_key,address_recipient,address_postcode,address_recipient_address,address_recipient_address_detail,address_recipient_phone,address_request,address_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

                    try (PreparedStatement insertAddressStatement = conn.prepareStatement(insertAddressSql)) {
                        insertAddressStatement.setLong(1, userKey);
                        insertAddressStatement.setString(2, userDTO.getUserName());
                        insertAddressStatement.setString(3, userDTO.getUserPostcode());
                        insertAddressStatement.setString(4, userDTO.getUserAddr());
                        insertAddressStatement.setString(5, userDTO.getUserDetailAddr());
                        insertAddressStatement.setString(6, userDTO.getUserPhone());
                        insertAddressStatement.setString(7, "배송전 연락 바랍니다.");
                        insertAddressStatement.setBoolean(8, true);

                        int rowsAffectedAddress = insertAddressStatement.executeUpdate();

                        if (rowsAffectedAddress == 0) {
                            throw new SQLException("주소 정보 삽입에 실패하였습니다.");
                        }

                        String insertAgreementSql = "INSERT INTO agreement (user_key, required_terms_condition, required_terms_of_privacy, optional_terms_of_privacy, optional_terms_of_sms, optional_terms_of_mailing, required_signup_age) VALUES (?, ?, ?, ?, ?, ?, ?)";

                        try (PreparedStatement insertAgreementStatement = conn.prepareStatement(insertAgreementSql)) {
                            insertAgreementStatement.setLong(1, userKey);
                            insertAgreementStatement.setBoolean(2, userDTO.isRequiredTermsCondition());
                            insertAgreementStatement.setBoolean(3, userDTO.isRequiredTermsOfPrivacy());
                            insertAgreementStatement.setBoolean(4, userDTO.isOptionalTermsOfPrivacy());
                            insertAgreementStatement.setBoolean(5, userDTO.isOptionalTermsOfSms());
                            insertAgreementStatement.setBoolean(6, userDTO.isOptionalTermsOfMailing());
                            insertAgreementStatement.setBoolean(7, userDTO.isRequiredSignupAge());
                            
                            int rowsAffectedAgreement = insertAgreementStatement.executeUpdate();

                            if (rowsAffectedAgreement == 0) {
                                throw new SQLException("약관 정보 삽입에 실패하였습니다.");
                            }

                            conn.commit(); // 트랜잭션 커밋
                            return true;
                        }
                    }
                }
            }
        }

    } catch (SQLException e) {
        e.printStackTrace();
        try {
            if (conn != null) {
                conn.rollback(); // 트랜잭션 롤백
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    } finally {
        try {
            if (conn != null) {
                conn.setAutoCommit(true); // 트랜잭션 종료 후 자동 커밋 설정
                conn.close(); // Connection 닫기
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    return false; // 실패 시 false 반환
}

    public int signin(String user_id, String user_pw) {
        String SQL = "SELECT user_pw FROM user WHERE user_id = ?";

        try (Connection connection = DatabaseConnection.getConnection();
      	         PreparedStatement preparedStatement = connection.prepareStatement(SQL)) {
            
        	preparedStatement.setString(1, user_id);
            ResultSet rs = preparedStatement.executeQuery();

            if (rs.next()) {
                String storedPassword = rs.getString(1);
                if (storedPassword.equals(user_pw)) {
                    // 로그인 성공
                    return 1;
                } else {
                    // 비밀번호 불일치
                    return 0;
                }
            } else {
                // 사용자가 존재하지 않음
                return -1;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
		return -2;
    }

//    // 수정 메서드
//    public int update(UserDTO userDTO) {
//        String SQL = "UPDATE kurly_user SET user_pw = ?, user_irum = ?, user_email = ?, user_hp = ?, user_addr = ?, user_gender = ?, user_birth = ?, user_chooga = ?, user_service = ?  WHERE user_id = ? ";
//        try {
//            PreparedStatement ps = conn.prepareStatement(SQL);
//            ps.setString(1, userDTO.getUser_pw());
//            ps.setString(2, userDTO.getUser_irum());
//            ps.setString(3, userDTO.getUser_email());
//            ps.setString(4, userDTO.getUser_hp());
//            ps.setString(5, userDTO.getUser_addr());
//            ps.setString(6, userDTO.getUser_gender());
//            ps.setString(7, userDTO.getUser_birth());
//            ps.setString(8, userDTO.getUser_chooga());
//            ps.setString(9, userDTO.getUser_service());
//            ps.setString(10, userDTO.getUser_id());
//            return ps.executeUpdate();
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if (rs != null) {
//                    rs.close();
//                }
//                if (ps != null) {
//                    ps.close();
//                }
//                if (conn != null) {
//                    conn.close();
//                }
//            } catch (Exception e) {
//            }
//        }
//        return -1;
//    }
//
//    // 삭제 메서드
//    public int delete(String user_id, String user_pw) {
//        String SQL = "DELETE FROM kurly_user  WHERE user_id = ? AND  user_pw = ?";
//        try {
//            PreparedStatement ps = conn.prepareStatement(SQL);
//            ps.setString(1, user_id);
//            ps.setString(2, user_pw);
//            return ps.executeUpdate();
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if (rs != null) {
//                    rs.close();
//                }
//                if (ps != null) {
//                    ps.close();
//                }
//                if (conn != null) {
//                    conn.close();
//                }
//            } catch (Exception e) {
//            }
//        }
//        return -1;
//    }
//
//    // 개인정보확인하기
//    public UserDTO getJoin(String user_id) {
//        UserDTO userDTO = new UserDTO();
//
//        String SQL = "SELECT * FROM kurly_user WHERE user_id = ?";
//
//        try {
//            PreparedStatement ps = conn.prepareStatement(SQL);
//            ps.setString(1, user_id);
//            rs = ps.executeQuery();
//
//            if (rs.next()) {
//                userDTO.setUser_id(rs.getString("user_id"));
//                userDTO.setUser_pw(rs.getString("user_pw"));
//                userDTO.setUser_irum(rs.getString("user_irum"));
//                userDTO.setUser_email(rs.getString("user_email"));
//                userDTO.setUser_hp(rs.getString("user_hp"));
//                userDTO.setUser_addr(rs.getString("user_addr"));
//                userDTO.setUser_gender(rs.getString("user_gender"));
//                userDTO.setUser_birth(rs.getString("user_birth"));
//                userDTO.setUser_chooga(rs.getString("user_chooga"));
//                userDTO.setUser_service(rs.getString("user_service"));
//                userDTO.setUser_gaib_date(rs.getString("user_gaib_date"));
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if (rs != null) {
//                    rs.close();
//                }
//                if (ps != null) {
//                    ps.close();
//                }
//                if (conn != null) {
//                    conn.close();
//                }
//            } catch (Exception e) {
//            }
//        }
//
//        return userDTO;
//    }
//
    // 아이디찾기 메서드
    // 1차 검색 이름
    // 1차 검색 결과를 이용하여 반복문 WHILE 사용 이메일을 검색
    public UserIdFindDTO idSearchAtPhone(String user_name, String user_phone) {
        String SQL = "SELECT user_phone, user_id, user_join_date  FROM user WHERE user_name = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL)) {
            
            ps.setString(1, user_name);
            
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    // user_phone(전화번호) 비교
                    if (rs.getString(1).equals(user_phone)) {
                        UserIdFindDTO userDTO = new UserIdFindDTO();
                        // 이메일이 일치하면 검색 정보 아이디를 반환
                        userDTO.setUser_id(rs.getString(2)); // SQL 조회된 아이디를 반환
                        userDTO.setUser_join_date(rs.getTimestamp(3)); // SQL 조회된 가입일자를 반환
                        userDTO.setUser_name(user_name);
                        return userDTO;
                    }
                    // user_phone(전화번호)가 일치하지 않으면 다음 레코드로 진행
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null; // 검색 결과가 없으면 null 반환
    }
    
    public UserIdFindDTO idSearchAtEmail(String user_name, String user_email) {
        String SQL = "SELECT user_email, user_id, user_join_date  FROM user WHERE user_name = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL)) {
            
            ps.setString(1, user_name);
            
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    if (rs.getString(1).equals(user_email)) {
                        UserIdFindDTO userDTO = new UserIdFindDTO();
                        // 이메일이 일치하면 검색 정보 아이디를 반환
                        userDTO.setUser_id(rs.getString(2)); // SQL 조회된 아이디를 반환
                        userDTO.setUser_join_date(rs.getTimestamp(3)); // SQL 조회된 가입일자를 반환
                        userDTO.setUser_name(user_name);
                        return userDTO;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null; // 검색 결과가 없으면 null 반환
    }
    
    // 사용자의 비밀번호 변경 요청 데이터 일치 여부 확인 메서드
    public boolean validatePasswordChangeRequest(String user_id, String user_phone, String user_email) {
        String SQL = "SELECT 1 FROM user WHERE user_id = ? AND (user_phone = ? OR user_email = ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL)) {

            ps.setString(1, user_id);
            ps.setString(2, user_phone);
            ps.setString(3, user_email);

            try (ResultSet rs = ps.executeQuery()) {
                return rs.next();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    // 비밀번호 변경 메서드
    public int updatePassword(String user_id, String new_password) {
        String SQL = "UPDATE user SET user_pw = ? WHERE user_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL)) {

            ps.setString(1, new_password);
            ps.setString(2, user_id);

            int rowsAffected = ps.executeUpdate();

            if (rowsAffected > 0) {
                return rowsAffected; // 변경 성공
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return -1; // 변경 실패
    }
    

    // 아이디 중복확인 메서드
    public boolean idCheckMethod(String user_id) {
        boolean result = false; // 초기값 중복안된상태

        String SQL = "SELECT user_id FROM user WHERE user_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL)) {

            ps.setString(1, user_id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    result = true; // 중복된 아이디
                } else {
                    result = false; // 사용 가능한 아이디
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result; // 아이디 중복여부 결과 리턴 boolean
    }

    // 이메일 중복확인 메서드
    public boolean emailCheckMethod(String user_email) {
        boolean result = false; // 초기값 중복안된상태

        String SQL = "SELECT user_email  FROM user WHERE user_email = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL)) {

            ps.setString(1, user_email);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    result = true; // 중복된 이메일
                } else {
                    result = false; // 사용 가능한 이메일
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result; // 이메일 중복여부 결과 리턴 boolean
    }
    
	
    public boolean addProductToWishlist(String userId, long productId) {
        String insertWishlistSql = "INSERT INTO wishlist (user_key, product_id) VALUES ((SELECT user_key FROM user WHERE user_id = ?), ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement insertWishlistStatement = conn.prepareStatement(insertWishlistSql)) {

            // 사용자 계정 ID를 사용하여 user_key를 조회
            insertWishlistStatement.setString(1, userId);
            // 상품 ID를 직접 설정
            insertWishlistStatement.setLong(2, productId);

            int rowsAffected = insertWishlistStatement.executeUpdate();

            // rowsAffected가 0보다 크면 성공적으로 추가된 것
            return rowsAffected > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false; // 실패 시 false 반환
    }
	    
    
    public boolean removeProductFromWishlist(String userId, long productId) {
        String deleteWishlistSql = "DELETE FROM wishlist WHERE user_key = (SELECT user_key FROM user WHERE user_id = ?) AND product_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement deleteWishlistStatement = conn.prepareStatement(deleteWishlistSql)) {

            // 사용자 계정 ID를 사용하여 user_key를 조회
            deleteWishlistStatement.setString(1, userId);
            // 상품 ID를 직접 설정
            deleteWishlistStatement.setLong(2, productId);

            int rowsAffected = deleteWishlistStatement.executeUpdate();

            // rowsAffected가 0보다 크면 성공적으로 삭제된 것
            return rowsAffected > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false; // 실패 시 false 반환
    }
    
    public boolean updateUserAddress(UserAddressDTO userAddressDTO) {
        String updateAddressSql = "UPDATE user_address " +
                                  "SET address_postcode = ?, " +
                                  "    address_recipient_address = ?, " +
                                  "    address_recipient_address_detail = ? " +
                                  "WHERE user_key = (SELECT user_key FROM user WHERE user_id = ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement updateAddressStatement = conn.prepareStatement(updateAddressSql)) {

            updateAddressStatement.setString(1, userAddressDTO.getUserPostcode());
            updateAddressStatement.setString(2, userAddressDTO.getUserAddr());
            updateAddressStatement.setString(3, userAddressDTO.getUserDetailAddr());
            updateAddressStatement.setString(4, userAddressDTO.getUserId());

            int rowsUpdated = updateAddressStatement.executeUpdate();

            return rowsUpdated > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false; // 실패 시 false 반환
    }
    
    public UserAddressDTO getUserAddress(UserAddressDTO userAddressDTO) {
        UserAddressDTO resultUserAddressDTO = new UserAddressDTO();

        String getAddressSql = "SELECT address_postcode, " +
                "address_recipient_address, address_recipient_address_detail " +
                "FROM user_address " +
                "WHERE user_key = (SELECT user_key FROM user WHERE user_id = ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement getAddressStatement = conn.prepareStatement(getAddressSql)) {

            getAddressStatement.setString(1, userAddressDTO.getUserId());

            try (ResultSet resultSet = getAddressStatement.executeQuery()) {
                if (resultSet.next()) {
                    resultUserAddressDTO.setUserPostcode(resultSet.getString("address_postcode"));
                    resultUserAddressDTO.setUserAddr(resultSet.getString("address_recipient_address"));
                    resultUserAddressDTO.setUserDetailAddr(resultSet.getString("address_recipient_address_detail"));
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return resultUserAddressDTO;
    }
}
