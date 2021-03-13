package fr.seblaporte.springboot2app.model;

import java.sql.Clob;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "T005_")
@Data
@EqualsAndHashCode(callSuper = false)
public class Usuario extends BaseEntity {

    private static final long serialVersionUID = 5167077150402562383L;

    @Id
    @Column(name = "T005_C001_", unique = true, nullable = false, precision = 10, scale = 0)
    private Integer codigo;

    @Column(name = "T005_C002_", length = 100, nullable = false)
    private String nome;

    @Column(name = "T005_C003_", length = 14)
    private String cpfCnpj;

    @Column(name = "T005_C004_", length = 100)
    private String email;

    @Column(name = "T005_C005_", length = 200)
    private String senha;

    @Column(name = "T005_C006_")
    private boolean shutdown;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "T005_C007_", foreignKey = @ForeignKey(name = "FK_T005_T005_"))
    private Usuario usuarioResponsavel;

    @Column(name = "T005_C008_")
    private boolean gerirUsuarios;

    @Column(name = "T005_C009_")
    private boolean excluido;

    @Column(name = "T005_C010_", length = 500)
    private String motivoBloqueio;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "T005_C011_")
    private Calendar dataSenha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "T005_C012_", foreignKey = @ForeignKey(name = "FK_T005_T011_"))
    private NivelUsuario nivelUsuario;

    @Column(name = "T005_C013_")
    private boolean permiteDesconectarUsuarios;

    @Column(name = "T005_C014_")
    private boolean ativo;

    /**
     * a associação de usuario é feito pela tabela T006_
     */
    // @Deprecated
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "T005_C015_", foreignKey = @ForeignKey(name =
    // "FK_T005_T002_"))
    // private Perfil perfil;

    @Column(name = "T005_C016_", length = 20)
    private String codigoUsuarioAD;

    @Column(name = "T005_C017_", columnDefinition = "clob")
    private Clob assinatura;

}
