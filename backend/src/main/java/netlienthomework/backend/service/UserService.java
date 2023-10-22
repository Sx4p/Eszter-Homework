package netlienthomework.backend.service;

import lombok.RequiredArgsConstructor;
import netlienthomework.backend.config.JwtService;
import netlienthomework.backend.controller.RegisterRequest;
import netlienthomework.backend.model.User;
import netlienthomework.backend.repository.UserRepository;
import netlienthomework.backend.controller.AuthenticationRequest;
import netlienthomework.backend.controller.AuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final static int MINIMUM_PASSWORD_LENGTH = 8;

    public ResponseEntity<String> userRegistration(RegisterRequest request) {
        if (!userRepository.existsByUserName(request.getUsername())) {
            if (request.getPassword().length() >= MINIMUM_PASSWORD_LENGTH) {
                String encryptedPassword = encoder.encode(request.getPassword());
                User newUser = User.builder().userName(request.getUsername()).password(encryptedPassword).build();
                userRepository.save(newUser);
            } else {
                return ResponseEntity.status(422).body("Password is not long enough!");
            }
        } else {
            return ResponseEntity.status(409).body("Username already taken!");
        }
        return ResponseEntity.ok("Successful Registration!");
    }

    public ResponseEntity<AuthenticationResponse> authenticateUserLogin(AuthenticationRequest request) {
        var authentication = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        Authentication authenticate = authenticationManager.authenticate(authentication);
        SecurityContextHolder.getContext().setAuthentication(authenticate);

        String token = jwtService.generateToken(authenticate.getName());
        AuthenticationResponse authResponse = new AuthenticationResponse();
        authResponse.setToken(token);
        authResponse.setUsername(request.getUsername());
        return ResponseEntity.ok(authResponse);
    }
}
