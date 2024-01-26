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
import kurlyuser.dto.UserPasswordChangeDTO;

@WebServlet("/pwvalid")
public class UserPasswordChangeValidateServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        // JSON 데이터 읽기
        BufferedReader reader = request.getReader();
        StringBuilder json = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            json.append(line);
        }
        // Jackson ObjectMapper를 사용하여 JSON을 자바 객체로 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        UserPasswordChangeDTO user = objectMapper.readValue(json.toString(), UserPasswordChangeDTO.class);
        
        UserDAO userDao = new UserDAO();
        
        boolean result = userDao.validatePasswordChangeRequest(user.getUser_id(),user.getUser_phone(), user.getUser_email());
        
        if (result == true) {
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"result\": \"success\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"result\": \"fail\"}");
        }
        
        System.out.println("Received JSON data: " + json.toString());
    }
}