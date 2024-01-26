package kurlyuser.controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import kurlyuser.dao.UserDAO;
import kurlyuser.dto.UserSignUpDTO;

@WebServlet("/signin")
public class SignInServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            request.setCharacterEncoding("UTF-8");
            response.setCharacterEncoding("UTF-8");
            
            BufferedReader reader = request.getReader();
            StringBuilder json = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                json.append(line);
            }

            ObjectMapper objectMapper = new ObjectMapper();
            UserSignUpDTO user = objectMapper.readValue(json.toString(), UserSignUpDTO.class);

            UserDAO userDao = new UserDAO();
            int result = userDao.signin(user.getUserId(), user.getUserPw());

            if (result > 0) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"result\":" + result + "}");
            } else if (result == 0) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{\"result\":"  + result +  ",\"reason\": \"비밀번호 불일치\" }");
//                response.getWriter().write("{\"result\": \"fail\", \"reason\": \"비밀번호 불일치\"}");
            } else if (result == -1) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{\"result\":"  + result +  ",\"reason\": \"사용자가 존재하지 않음\" }");
//                response.getWriter().write("{\"result\": \"fail\", \"reason\": \"사용자가 존재하지 않음\"}");
            } else if (result == -2) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                response.getWriter().write("{\"result\": \"fail\", \"reason\": \"DB 오류\"}");
                response.getWriter().write("{\"result\":"  + result +  ",\"reason\": \"에러가 발생했습니다.\" }");
            }

            System.out.println("Received JSON data: " + json.toString());
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"result\": \"error\", \"reason\": \"서버 오류\"}");
        }
    }
}
