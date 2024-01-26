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
import kurlyuser.dto.UserIdFindDTO;
import kurlyuser.dto.UserSignUpDTO;

@WebServlet("/idfindphone")
public class UserIdFindByPhoneServlet extends HttpServlet {
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
            UserIdFindDTO result = userDao.idSearchAtPhone(user.getUserName(), user.getUserPhone());
            
            if (result != null) {
                response.setStatus(HttpServletResponse.SC_OK);
                String jsonResponse = objectMapper.writeValueAsString(result);
                response.getWriter().write(jsonResponse);
            } else {
                response.setStatus(HttpServletResponse.SC_CONFLICT);
                response.getWriter().write("{\"result\": \"fail\", \"reason\": \"아이디를 찾을 수 없습니다.\"}");
            }
            
            System.out.println("Received JSON data: " + json.toString());
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"result\": \"error\", \"reason\": \"서버 오류\"}");
        }
    }
}