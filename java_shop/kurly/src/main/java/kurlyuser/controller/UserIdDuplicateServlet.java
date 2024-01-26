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

@WebServlet("/idcheck")
public class UserIdDuplicateServlet extends HttpServlet {
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
            boolean result = userDao.idCheckMethod(user.getUserId());
            
            if (result) {
                response.setStatus(HttpServletResponse.SC_CONFLICT);
                response.getWriter().write("{\"result\": "+ result+", \"reason\": \"ID가 존재합니다.\"}");
            } else {
            	response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"result\": "+ result+"}");
            }
            
            System.out.println("Received JSON data: " + json.toString());
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"result\": \"error\", \"reason\": \"서버 오류\"}");
        }
    }
}