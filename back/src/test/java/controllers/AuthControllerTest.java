package controllers;

import com.openclassrooms.starterjwt.controllers.AuthController;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.payload.request.LoginRequest;
import com.openclassrooms.starterjwt.payload.request.SignupRequest;
import com.openclassrooms.starterjwt.payload.response.JwtResponse;
import com.openclassrooms.starterjwt.payload.response.MessageResponse;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.security.jwt.JwtUtils;
import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserRepository userRepository;

    private LoginRequest loginRequest;
    private SignupRequest signupRequest;
    private User user;

    @BeforeEach
    public void setUp() {
        loginRequest = new LoginRequest();
        loginRequest.setEmail("user@example.com");
        loginRequest.setPassword("password");

        signupRequest = new SignupRequest();
        signupRequest.setEmail("user@example.com");
        signupRequest.setFirstName("John");
        signupRequest.setLastName("Doe");
        signupRequest.setPassword("password");

        // Initialize User object
        user = new User();
        user.setId(1L);
        user.setEmail("user@example.com");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPassword("encodedPassword");
        user.setAdmin(false);
    }

    @Test
    public void authenticateUser_LoginIsSuccessful() {
        // Arrange
        UserDetails userDetails = new UserDetailsImpl(user.getId(), user.getEmail(), user.getFirstName(),
                user.getLastName(), user.isAdmin(), user.getPassword());
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null);

        when(authenticationManager.authenticate(any())).thenReturn(authentication);
        when(jwtUtils.generateJwtToken(authentication)).thenReturn("mockJwtToken");
        when(userRepository.findByEmail(user.getEmail())).thenReturn(java.util.Optional.of(user));

        ResponseEntity<?> response = authController.authenticateUser(loginRequest);

        assertEquals(200, response.getStatusCodeValue());
        JwtResponse jwtResponse = (JwtResponse) response.getBody();
        assertEquals("mockJwtToken", jwtResponse.getToken());
        assertEquals(user.getId(), jwtResponse.getId());
        assertEquals(user.getEmail(), jwtResponse.getUsername());
    }



    @Test
    public void registerUser_ShouldReturnBadRequest_IfEmailIsAlreadyTaken() {
        when(userRepository.existsByEmail(signupRequest.getEmail())).thenReturn(true);

        ResponseEntity<?> response = authController.registerUser(signupRequest);

        assertEquals(400, response.getStatusCodeValue());
        MessageResponse messageResponse = (MessageResponse) response.getBody();
        assertEquals("Error: Email is already taken!", messageResponse.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }
}
